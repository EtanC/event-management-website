from backend.src.database import db
from bson import ObjectId

def user_register_event(user_id, event_id):
    db.users.update_one(
        { '_id': ObjectId(user_id) },
        {
            '$addToSet': {
                'registered_events': event_id,
            }
        }
    )
    return {}

def user_events(user_id):
    # Get the user document
    user = db.users.find_one({ '_id': user_id })
    # 1. Get user's list of "registered_events" event_ids
    # 2. Search for events in events collection that match these ids
    return db.events.find({ '_id': { '$in': user['registered_events'] }})
