from backend.src.database import clear, db
import subprocess
import datetime
from backend.src.error import InputError
from bson import ObjectId

def events_crawl():
    subprocess.run(["cd backend/easychair_scraper && python3 -m scrapy crawl easychair"], shell=True)
    subprocess.run(["cd backend/easychair_scraper && python3 -m scrapy crawl wikicfp"], shell=True)
    return {}

def stringify_id(x):
    x.update({ '_id': str(x['_id'])})
    return x

def events_get_all():
    return list(map(stringify_id , db.events.find({})))

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

def event_create(event):
    if event_already_exists(event):
        raise InputError('Event already exists')
    if not event_is_valid(event):
        raise InputError('Invalid event')
    result = db.events.insert_one(event)
    return {
        'event_id': result.inserted_id
    }

def get_event(event_id):
    return db.events.find_one({ '_id': ObjectId(event_id) })

def event_update(event_id, new_event):
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

def event_delete(event_id):
    event = get_event(event_id)
    if event is None:
        raise InputError('No event in database with specified event_id')
    db.events.delete_one({ '_id': ObjectId(event_id)})
    return {}