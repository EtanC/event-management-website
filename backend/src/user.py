from backend.src.database import db
from bson import ObjectId
import jwt
from backend.src.config import config
from backend.src.error import AccessError, InputError
from bson import ObjectId
from backend.src.events import stringify_id
from backend.src.auth import decode_token

def user_exists(user_id):
    return db.users.find_one({ '_id': ObjectId(user_id) }) is not None

def event_exists(event_id):
    valid_id = ObjectId.is_valid(event_id)
    return valid_id and db.events.find_one({ '_id': ObjectId(event_id)}) is not None

def user_register_event(token, event_id):
    user_id = decode_token(token)
    if not event_exists(event_id):
        raise InputError('Invalid Event ID')
    result = db.users.update_one(
        { '_id': ObjectId(user_id) },
        {
            '$addToSet': {
                'registered_events': event_id,
            }
        }
    )
    if result.modified_count == 0:
        raise InputError('Already registered to event')
    return {}

def user_unregister_event(token, event_id):
    user_id = decode_token(token)
    result = db.users.update_one(
        { '_id': ObjectId(user_id) },
        {
            '$pull': {
                'registered_events': event_id,
            }
        }
    )
    if result.modified_count == 0:
        raise InputError('Not registered to event')
    return {}

# Convert a list of event_ids to event objects by finding the corresponding
# event in the database
def event_ids_to_events(event_ids):
    return list(map(stringify_id, db.events.find(
        { '_id':
            {
                '$in': list(map(ObjectId, event_ids))
            }
        }
    )))
def user_unregister_event(token, event_id):
    user_id = decode_token(token)
    result = db.users.update_one(
        { '_id': ObjectId(user_id) },
        {
            '$pull': {
                'registered_events': event_id,
            }
        }
    )
    if result.modified_count == 0:
        raise InputError('Not registered to event')
    return {}

def user_events(token):
    # Get the user document
    user_id = decode_token(token)
    user = db.users.find_one({ '_id': ObjectId(user_id) })
    # 1. Get user's list of "registered_events" event_ids
    # 2. Search for events in events collection that match these ids
    events = event_ids_to_events(user['registered_events'])
    return {
        'events': events,
    }

def get_user(user_id):
    return db.users.find_one({ '_id': ObjectId(user_id) })

def user_manage_events(token):
    user_id = decode_token(token)
    user = get_user(user_id)
    if user is None:
        raise AccessError('User does not exist')
    creator_events = event_ids_to_events(user['owned_events'])
    managed_events = event_ids_to_events(user['managed_events'])
    return {
        'creator': creator_events,
        'manager': managed_events
    }