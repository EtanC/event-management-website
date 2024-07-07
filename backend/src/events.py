from backend.src.database import clear, db
import subprocess
import datetime
from backend.src.error import InputError, AccessError
from backend.src.auth import decode_token
from bson import ObjectId

def events_crawl():
    subprocess.run(["cd backend/easychair_scraper && python3 -m scrapy crawl easychair"], shell=True)
    subprocess.run(["cd backend/easychair_scraper && python3 -m scrapy crawl wikicfp"], shell=True)
    return {}

def stringify_id(x):
    x['_id'] = str(x['_id'])
    return x

def events_get_all():
    return {
        'events': list(map(stringify_id , db.events.find({})))
    }

def events_clear():
    clear('events')
    return {}

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
    if len(event['name']) == 0: return False
    if len(event['location']) == 0: return False
    # if not is_real_date(event['start_date']): return False
    # if not is_real_date(event['deadline']): return False
    return True

def event_create(token, event):
    user_id = decode_token(token)
    if event_already_exists(event):
        raise InputError('Event already exists')
    if not event_is_valid(event):
        raise InputError('Invalid event')
    user = db['users'].find({ '_id': user_id })
    event['ranking'] = 0
    event['authorized_users'] = []
    event['creator'] = user_id
    result = db.events.insert_one(event)
    db['users'].update_one(
        { '_id': ObjectId(user_id) },
        { '$addToSet': {
            'owned_events': str(result.inserted_id)
        }}
    )
    return {
        'event_id': str(result.inserted_id)
    }

def get_event(event_id):
    return db.events.find_one({ '_id': ObjectId(event_id) })

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
        { '_id': ObjectId(event_id) },
        { '$set': {
            'name': new_event['name'],
            'location': new_event['location'],
            'start_date': new_event['start_date'],
            'deadline': new_event['deadline'],
            'details': new_event['details'],
            'details_link': new_event['details_link'],
        }}
    )
    return {}

def user_is_creator(user_id, event_id):
    return user_id == db['events'].find_one({ '_id': ObjectId(event_id) })['creator']

def event_delete(token, event_id):
    user_id = decode_token(token)
    if not user_is_creator(user_id, event_id):
        raise AccessError('User not authorized to delete event')
    event = get_event(event_id)
    if event is None:
        raise InputError('No event in database with specified event_id')
    db.events.delete_one({ '_id': ObjectId(event_id)})
    return {}

def event_authorize(token, event_id, to_be_added_id):
    user_id = decode_token(token)
    if not user_is_creator(user_id, ObjectId(event_id)):
        raise AccessError('User is not authorized to allow other people to manage event')
    # Add user to authorized list
    db['events'].update_one(
        { '_id': ObjectId(event_id) },
        { '$addToSet': {
            'authorized_users': to_be_added_id,
        }}
    )
    # add event to users list of managed events
    db['users'].update_one(
        { '_id': ObjectId(to_be_added_id) },
        { '$addToSet': {
            'managed_events': ObjectId(event_id)
        }}
    )
    return {}