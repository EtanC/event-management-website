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

def user_register_event(token, event_id):
    user_id = decode_token(token)
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



def user_events(token):
    # Get the user document
    user_id = decode_token(token)
    user = db.users.find_one({ '_id': ObjectId(user_id) })
    # 1. Get user's list of "registered_events" event_ids
    # 2. Search for events in events collection that match these ids
    events = list(map(stringify_id, db.events.find({ '_id': { '$in': list(map(ObjectId, user['registered_events'])) }})))
    return {
        'events': events,
    }
