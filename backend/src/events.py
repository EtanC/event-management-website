import sys
from backend.src.database import clear, db
import subprocess
import requests
import os
from dotenv import load_dotenv
import datetime
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

def events_get_all():
    return {
        'events': list(map(stringify_id, db.events.find({})))
    }

def events_get_tagged(tags):
    # Will return all events with at least 1 matching tag, events with more matching tags are prioritised first

    # loop through the tags and add each event to a list, paired with the number 1 aka the number of tags that have applied to them 
    # so far

    # then loop through the next tag and search through the events that match that tag, if the tag doesnt exist in the list already
    # then do the same as above, if it does already exist within the list just increment the numebr paired with the tag, as there has 
    # 2 matches so far

    events_counted = []

    for tag in tags:
        events_matched = list(map(stringify_id, db.events.find({"tag": tag})))

        events_list = [event[0] for event in events_counted]
        for event in events_matched:
            if event in events_list: 
                event_increment = next(e for e in events_counted if events_counted[0] == event)
                event_increment[1] += 1
            else: 
                events_list.append((event, 1))

    events_sorted = sorted(events_counted, key=lambda event: event[0], reverse=True)

    return [event[0] for event in events_sorted]


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

def is_admin(user_id):
    return db.users.find_one({"_id": ObjectId(user_id)}).get('isAdmin')

def user_is_authorized(user_id, event_id):
    event = get_event(event_id)
    if user_id in event['authorized_users'] or user_id == event['creator']:
        return True
    if is_admin(user_id):
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


def user_is_creator_or_admin_priviledges(user_id, event_id):
    creator = db['events'].find_one({'_id': ObjectId(event_id)})['creator']
    return user_id == creator or is_admin(user_id)


def event_delete(token, event_id):
    user_id = decode_token(token)
    if not user_is_creator_or_admin_priviledges(user_id, event_id):
        raise AccessError('User not authorized to delete event')
    event = get_event(event_id)
    if event is None:
        raise InputError('No event in database with specified event_id')
    db.events.delete_one({'_id': ObjectId(event_id)})
    return {}


def event_authorize(token, event_id, to_be_added_email):
    user_id = decode_token(token)
    if not user_is_creator_or_admin_priviledges(user_id, event_id):
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
