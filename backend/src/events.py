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


def events_crawl():
    subprocess.run(["python3 -m scrapy crawl easychair"], shell=True)
    subprocess.run(["python3 -m scrapy crawl wikicfp"], shell=True)
    return {}


def stringify_id(x):
    x['_id'] = str(x['_id'])
    return x

def events_get_page(page_number, name, location, date):
    page_number = int(page_number)
    PAGE_SIZE = 12
    
    match_stage = {}
    if name:
      match_stage['name'] = {"$regex": name, "$options": "i"}
    if location:
      match_stage["location"] = location 
    if date:
        try:
            date_obj = datetime.strptime(date, "%d %B %Y")
            match_stage["converted_start_date"] = {"$gt": date_obj}
        except ValueError:
            return jsonify({"error": "Invalid date format. Use 'DD MMMM YYYY'."}), 400
    # Create events date format isn't consistent with the rest of the webcrawlers       
    pipeline = [
         {"$addFields": {
            "converted_start_date": {
                "$cond": {
                    "if": {"$regexMatch": {"input": "$start_date", "regex": "^[0-9]{1,2} [A-Za-z]+ [0-9]{4}$"}},
                    "then": {"$dateFromString": {"dateString": "$start_date", "format": "%d %B %Y"}},
                    "else": {"$dateFromString": {"dateString": "$start_date", "format": "%b %d, %Y"}}
                }
            }
        }},
        {"$match": match_stage},
        {"$facet": {
            "totalCount": [{"$count": "count"}],
            "events": [
                {"$skip": (page_number - 1) * PAGE_SIZE},
                {"$limit": PAGE_SIZE}
            ]
        }}
    ]
    
    result = list(db.events.aggregate(pipeline))
    
    total_count = result[0]['totalCount'][0]['count'] if result[0]['totalCount'] else 0
    page_count = (total_count + PAGE_SIZE - 1) // PAGE_SIZE
    
    events = result[0]['events']
    events = list(map(stringify_id, events))
    
    return {
        'events': events,
        'page_count': page_count
    }


def events_get_all():
    return {
        'events': list(map(stringify_id, db.events.find({})))
    }


def events_clear():
    clear('events')
    return {}


def events_ai_description():
    load_dotenv()
    AI_TOKEN = os.getenv("AI_TOKEN")
    # loop through each event listing
    cursor = db.events.find()
    # ai API
    API_URL = "https://api-inference.huggingface.co/models/pszemraj/led-large-book-summary"
    headers = {"Authorization": f"Bearer {AI_TOKEN}"}
    for event in cursor:
        ai_description = event.get("ai_description")
        if ai_description is None or (ai_description and 'error' in ai_description):
            query_filter = {"_id": event["_id"]}
            output = query({
                "inputs": event.get("details"),
                "options": {"wait_for_model": True}
            }, API_URL, headers)
            db.events.update_one(
                query_filter, {"$set": {"ai_description": output}})
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
    event['image'] = random.randint(config['RANDOM_IMAGES_START_INDEX'], config['RANDOM_IMAGES_END_INDEX'])
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


def user_is_authorized(user_id, event_id):
    event = get_event(event_id)
    if user_id in event['authorized_users'] or user_id == event['creator']:
        return True
    return False


def event_update(token, event_id, new_event):
    user_id = decode_token(token)
    if not user_is_authorized(user_id, event_id):
        raise AccessError('User not authorized to update event')
    event = get_event(event_id)
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
            # 'tags': new_event['tags'],
            'details': new_event['details'],
            'details_link': new_event['details_link'],
            # 'image': new_event['image'],
        }}
    )
    return {}


def user_is_creator(user_id, event_id):
    print(user_id)
    creator = db['events'].find_one({'_id': ObjectId(event_id)})['creator']
    print(creator)
    return user_id == creator


def event_delete(token, event_id):
    user_id = decode_token(token)
    if not user_is_creator(user_id, event_id):
        raise AccessError('User not authorized to delete event')
    event = get_event(event_id)
    if event is None:
        raise InputError('No event in database with specified event_id')
    db.events.delete_one({'_id': ObjectId(event_id)})
    return {}


def event_authorize(token, event_id, to_be_added_email):
    user_id = decode_token(token)
    if not user_is_creator(user_id, event_id):
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
