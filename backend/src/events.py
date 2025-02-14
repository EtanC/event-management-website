import sys

from flask import jsonify
from backend.src.database import clear, db
import subprocess
import requests
import os
from dotenv import load_dotenv
from datetime import datetime
from backend.src.error import InputError, AccessError
from backend.src.auth import decode_token
from backend.src.config import config
from bson import ObjectId
import random
from openai import OpenAI
from bs4 import BeautifulSoup

load_dotenv()
OPENAI_API_KEY = os.getenv("AI_TOKEN")
client = OpenAI(api_key=OPENAI_API_KEY)


def events_crawl():
    database_name = config['TESTDB_NAME'] if db.test else config['DATABASE_NAME']
    subprocess.run(
        [f"python3 -m scrapy crawl easychair -a database_name={database_name}"], shell=True)
    subprocess.run(
        [f"python3 -m scrapy crawl wikicfp -a database_name={database_name}"], shell=True)
    return {}


def stringify_id(x):
    x['_id'] = str(x['_id'])
    return x


def events_get_page(page_number, name, location, date, tags, sort_by):
    page_number = int(page_number)
    PAGE_SIZE = 12

    match_stage = {}
    if name:
        match_stage['name'] = {"$regex": name, "$options": "i"}
    if location:
        match_stage["location"] = location
    if date:
        try:
            date_obj = datetime.strptime(date, "%Y-%m-%d")
            match_stage["converted_start_date"] = {"$gt": date_obj}
        except ValueError:
            return jsonify({"error": "Invalid date format."}), 400
    if tags:
        match_stage["tags"] = {"$all": tags}

    # alphabetical sort and view count sort
    sort_stage = {"name": 1}  # default to sorting name
    if sort_by:
        if sort_by == 'alphabetical':
            sort_stage = {"name": 1}
        elif sort_by == 'reverse':
            sort_stage = {"name": -1}
        elif sort_by == 'view_count':
            sort_stage = {"view_count": -1}

    # Ensure the fields to sort by are present
    projection_stage = {
        "name": 1,
        "location": 1,
        "start_date": 1,
        "view_count": 1,
        "tags": 1
    }

    # Create events date format isn't consistent with the rest of the webcrawlers
    pipeline = [
        {"$addFields": {
            "converted_start_date": {
                "$cond": {
                    "if": {"$regexMatch": {"input": "$start_date", "regex": "^\\d{4}-\\d{2}-\\d{2}$"}},
                    "then": {"$dateFromString": {"dateString": "$start_date", "format": "%Y-%m-%d"}},
                    "else": {
                      "$cond": {
                          "if": {"$regexMatch": {"input": "$start_date", "regex": "^\\w{3} \\d{2}, \\d{4}$"}},
                          "then": {"$dateFromString": {"dateString": "$start_date", "format": "%b %d, %Y"}},
                          "else": {"$dateFromString": {"dateString": "2000-01-01", "format": "%Y-%m-%d"}}
                      }
                    }
                }
            }
        }},
        {"$match": match_stage},
        {"$sort": sort_stage},
        {"$facet": {
            "totalCount": [{"$count": "count"}],
            "events": [
                {"$skip": (page_number - 1) * PAGE_SIZE},
                {"$limit": PAGE_SIZE}
            ]
        }}
    ]

    result = list(db.events.aggregate(pipeline))

    # Handle the case where totalCount or events might not be present
    if result and 'totalCount' in result[0] and result[0]['totalCount']:
        total_count = result[0]['totalCount'][0]['count']
    else:
        total_count = 0
    page_count = (total_count + PAGE_SIZE - 1) // PAGE_SIZE

    events = result[0]['events'] if result and 'events' in result[0] else []
    events = list(map(stringify_id, events))

    # Debugging logs
    return {
        'events': events,
        'page_count': page_count
    }


def events_get_all():
    return {
        'events': list(map(stringify_id, db.events.find({})))
    }


def events_get_tagged(tags):
    return {
        'events': list(map(stringify_id, db.events.find({"tags": {'$all': tags}})))
    }


def events_clear():
    clear('events')
    return {}

####################################################
# AI SECTION
####################################################
def clean_html(html_content):
    # this sanitises input, get rid of all html tags so that its cheaper to run chatgpt
    soup = BeautifulSoup(html_content, 'html.parser')
    return soup.get_text(separator=" ")


def generate_summary_and_tags(details):
    # Clean the input HTML content
    cleaned_details = clean_html(details)
    prompt = (
        "You summarize event descriptions and assign relevant tags from a given list. "
        "Use 'Unspecified' if no other tags fit.\n\n"
        "Output format:\n"
        "{\n"
        "    \"summary\": \"Summary of event in 50 words\",\n"
        "    \"tags\": []\n"
        "}\n\n"
        "Restrict the tags from this list:\n"
        "- Tag: Artificial Intelligence\n"
        "  Description: Conferences focusing on advancements and research in artificial intelligence.\n"
        "- Tag: Cybersecurity\n"
        "  Description: Events centered around developments and strategies in protecting digital information.\n"
        "- Tag: Software Engineering\n"
        "  Description: Conferences discussing methodologies and innovations in software development.\n"
        "- Tag: Data Science\n"
        "  Description: Gatherings that explore data analysis, big data technologies, and data management.\n"
        "- Tag: Computer Networks\n"
        "  Description: Events covering topics related to networking technologies and communication systems.\n"
        "- Tag: Human-Computer Interaction\n"
        "  Description: Conferences dedicated to the study of interaction between humans and computers.\n"
        "- Tag: Blockchain\n"
        "  Description: Conferences focusing on blockchain technology and cryptocurrencies.\n"
        "- Tag: Robotics\n"
        "  Description: Events exploring research and applications in robotics and automation.\n"
        "- Tag: Cloud Computing\n"
        "  Description: Events discussing cloud infrastructure, services, and security.\n"
        "- Tag: Quantum Computing\n"
        "  Description: Conferences discussing theoretical and practical aspects of quantum computing.\n"
        "- Tag: Computer Vision\n"
        "  Description: Events focusing on the development of algorithms for interpreting visual data.\n"
        "- Tag: Programming Languages\n"
        "  Description: Conferences focusing on the design and implementation of programming languages.\n"
        "- Tag: High Performance Computing\n"
        "  Description: Events discussing architecture and application of high performance computing systems.\n\n"
        f"Event Details:\n{cleaned_details}"
    )

    response = client.chat.completions.create(
        model="gpt-4o-mini",  # Use the appropriate model
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ]
    )

    # Access the response correctly
    output = response.choices[0].message.content

    try:
        # Assume that the output is a properly formatted JSON string
        result = eval(output)

        if isinstance(result, dict) and "summary" in result and "tags" in result:
            return result
        else:
            raise ValueError("Response format is incorrect.")
    except (SyntaxError, ValueError) as e:
        print("Error parsing response:", e)
        return {"summary": "Error in generating summary", "tags": ["Error"]}


def events_ai_description():
    cursor = db.events.find()
    for event in cursor:
        ai_description = event.get("ai_description")
        if ai_description is None or (ai_description and 'error' in ai_description):
            query_filter = {"_id": event["_id"]}
            details = event.get("details")
            output = generate_summary_and_tags(details)
            db.events.update_one(
                query_filter, {"$set": {"ai_description": output["summary"], "tags": output["tags"]}})
    return {}


def query(payload, url, headers):
    response = requests.post(url, headers=headers, json=payload)
    return response.json()


def event_already_exists(event):
    search_object = {
        'name': event['name'],
        'location': event['location'],
        'start_date': event['start_date'],
    }
    return db.events.find_one(search_object) is not None

# def is_real_date(date):
#     try:
#         datetime.datetime.strptime(date, "%Y-%m-%d %H:%M:%S.%f")
#     except ValueError:
#         return False
#     return True


def event_is_valid(event):
    if len(event['name']) == 0:
        return False
    if len(event['location']) == 0:
        return False
    # if not is_real_date(event['start_date']): return False
    # if not is_real_date(event['deadline']): return False
    return True


def event_create(token, event):
    user_id = decode_token(token)
    if event_already_exists(event):
        raise InputError('Event already exists')
    if not event_is_valid(event):
        raise InputError('Invalid event')
    event['ranking'] = 0
    event['authorized_users'] = []
    event['creator'] = user_id
    event['image'] = random.randint(
        config['RANDOM_IMAGES_START_INDEX'], config['RANDOM_IMAGES_END_INDEX'])
    event['crawled'] = False
    event['view_count'] = 0
    result = db.events.insert_one(event)
    db['users'].update_one(
        {'_id': ObjectId(user_id)},
        {'$addToSet': {
            'owned_events': str(result.inserted_id)
        }}
    )
    return {
        'event_id': str(result.inserted_id)
    }


def get_event(event_id):
    return db.events.find_one({'_id': ObjectId(event_id)})


def is_admin(user_id):
    return db.users.find_one({"_id": ObjectId(user_id)}).get('isAdmin')


def user_is_authorized(user_id, event):
    if user_id in event['authorized_users'] or user_id == event['creator']:
        return True
    if is_admin(user_id):
        return True
    return False


def event_update(token, event_id, new_event):
    user_id = decode_token(token)
    event = get_event(event_id)
    if event['crawled']:
        raise InputError('Cannot edit an event crawled from another source')
    if not user_is_authorized(user_id, event):
        raise AccessError('User not authorized to update event')
    if event is None:
        raise InputError('No event in database with specified event_id')
    if not event_is_valid(new_event):
        raise InputError('New event is not a valid event')
    db.events.update_one(
        {'_id': ObjectId(event_id)},
        {'$set': {
            'name': new_event['name'],
            'location': new_event['location'],
            'start_date': new_event['start_date'],
            'deadline': new_event['deadline'],
            'tags': new_event['tags'],
            'details': new_event['details'],
            'details_link': new_event['details_link'],
            # 'image': new_event['image'],
        }}
    )
    return {}


def event_view_count(event_id):
    try:
        if not ObjectId.is_valid(event_id):
            raise InputError('Invalid event_id format')
        event = get_event(event_id)
        if event is None:
            raise InputError('No event in database with specified event_id')

        db.events.update_one(
            {"_id": ObjectId(event_id)},
            {"$inc": {"view_count": 1}}
        )
        return jsonify({"message": "View count incremented successfully"}), 200
    except InputError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def user_is_creator(user_id, event):
    return user_id == event['creator']


def event_delete(token, event_id):
    user_id = decode_token(token)
    event = get_event(event_id)
    if event['crawled']:
        if not is_admin(user_id):
            raise InputError('Only admins permitted to delete crawled events')
    else:
        if not user_is_creator(user_id, event) and not is_admin(user_id):
            raise AccessError('User not authorized to delete event')
    if event is None:
        raise InputError('No event in database with specified event_id')
    db.events.delete_one({'_id': ObjectId(event_id)})
    return {}


def is_crawled_event(event_id):
    event = db.events.find_one({'_id': ObjectId(event_id)})
    return event['crawled']


def event_authorize(token, event_id, to_be_added_email):
    event = get_event(event_id)
    if event['crawled']:
        raise InputError('Cannot manage an event crawled from another source')
    user_id = decode_token(token)
    if not user_is_creator(user_id, event) and not is_admin(user_id):
        raise AccessError(
            'User is not authorized to allow other people to manage event')
    # Add user to authorized list
    to_be_added_id = get_id_from_email(to_be_added_email)
    db['events'].update_one(
        {'_id': ObjectId(event_id)},
        {'$addToSet': {
            'authorized_users': to_be_added_id,
        }}
    )
    # add event to users list of managed events
    db['users'].update_one(
        {'_id': ObjectId(to_be_added_id)},
        {'$addToSet': {
            'managed_events': ObjectId(event_id)
        }}
    )
    return {}


def get_id_from_email(email):
    user = db['users'].find_one({'email': email})
    if user:
        return str(user['_id'])
    else:
        raise InputError(f"No user found with email: {email}")
