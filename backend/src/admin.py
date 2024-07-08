from backend.src.error import AccessError, InputError
from backend.src.database import db
from backend.src.config import config
from backend.src.auth import decode_token
from bson import ObjectId

def is_admin(token):
    user_id = decode_token(token)
    return db.users.find_one({"_id": ObjectId(user_id)}).get('isAdmin')

def invite_admin(token, username):
    user_id = decode_token(token)

    # Check token validity
    user = db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise AccessError('User not found')
    if user.get('isAdmin') == False:
        raise AccessError('User is not an admin')
    
    filter = {'username': username}

    result = db.users.update_one(filter, {'$set': {'isAdmin': True}})
    if result.matched_count == 0:
        raise InputError('Provided username doesn\'t exist')


def remove_admin(token, username):
    user_id = decode_token(token)

    # Check token validity
    user = db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise AccessError('User not found')
    if user.get('isAdmin') == False:
        raise AccessError('User is not an admin')
    
    filter = {'username': username}

    result = db.users.update_one(filter, {'$set': {'isAdmin': False}})
    if result.matched_count == 0:
        raise InputError('Provided username doesn\'t exist')