from backend.src.error import AccessError, InputError
from backend.src.database import db
from backend.src.config import config
from backend.src.auth import hash, decode_token
from bson import ObjectId
import jwt
import hashlib
import base64
import string
from flask import request, make_response

# NOTE: keeping contact info as just email for now until we hear more


def get_profile_details(token):
    user_id = decode_token(token)

    # Check token validity
    user = db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise AccessError('User not found')

    file_id = user.get('profile_pic_id')
    if file_id:
        file_data = db.fs().get(file_id).read()
        encoded_image = base64.b64encode(file_data).decode(
            'utf-8')  # Encode and convert to string
    else:
        encoded_image = None  # Or set a default profile pic

    return {
        'username': user.get('username', ''),
        'email': user.get('email', ''),
        'description': user.get('description', ''),
        'full_name': user.get('full_name', ''),
        'job_title': user.get('job_title', ''),
        'fun_fact': user.get('fun_fact', ''),
        'profile_pic': encoded_image,
        'receive_notifications': user.get('receive_notifications', '')
    }

# mayeb won't deal with profile pics first, but might have to use GridFS to store on mongoDB


def update_profile_details(token, username, description, full_name, job_title, fun_fact, profile_pic):
    user_id = decode_token(token)

    filter = {'_id': ObjectId(user_id)}

    user = db.users.find_one({"_id": ObjectId(user_id)})
    changed_values = {"$set": {}}

    if username:
        if db.users.find_one({'username': username}) is not None:
            raise InputError('Username is already taken')
        else:
            changed_values['$set']['username'] = username
    if description:
        changed_values['$set']['description'] = description
    if full_name:
        changed_values['$set']['full_name'] = full_name
    if job_title:
        changed_values['$set']['job_title'] = job_title
    if fun_fact:
        changed_values['$set']['fun_fact'] = fun_fact
    if profile_pic:
        file_id = db.fs().put(profile_pic, filename=f"profile_pic_{user_id}")
        if 'profile_pic_id' in user:
            db.fs().delete(user['profile_pic_id'])
        changed_values['$set']['profile_pic_id'] = file_id

    result = db.users.update_one(filter, changed_values)
    if result.matched_count == 0:
        raise AccessError('User ID not found on database')
    response = make_response({'message': 'Successful Details Change'})
    return response


def update_profile_password(token, old_password, new_password, re_password):
    user_id = decode_token(token)

    filter = {'_id': ObjectId(user_id)}

    user = db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise AccessError('User not found')
    changed_values = {"$set": {}}

    if old_password is not None:
        hashed_old_password = hash(old_password)

    if old_password and hashed_old_password != user['password']:
        raise InputError("Old password doesn't match")
    elif not old_password and new_password:
        raise InputError('Old password required')
    elif old_password and new_password and not re_password:
        raise InputError('Please re-enter your new password')
    elif old_password and not new_password and re_password:
        raise InputError('Please enter your new password')
    elif old_password == new_password:
        raise InputError('New and old passwords cannot match')
    elif old_password and new_password != re_password:
        raise InputError("New passwords don't match")
    elif len(new_password) < 8:
        raise InputError('Password needs to be at least 8 characters long')
    elif not any(c in string.punctuation for c in new_password):
        raise InputError("Password needs a special character")
    elif not any(c in string.digits for c in new_password):
        raise InputError('Password needs a number')

    if old_password and hashed_old_password == user['password'] and new_password == re_password:
        changed_values['$set']['password'] = hash(new_password)
    result = db.users.update_one(filter, changed_values)
    if result.matched_count == 0:
        raise AccessError('User ID not found on database')
    response = make_response({'message': 'Successful Password Change'})
    return response


def update_preferences(token, new_preferences):
    # preferences set as a list of topics the user may be interested in
    # perhaps a later improvement could be adding some form of rankings amongst preferences for order in which events show up
    try:
        token = jwt.decode(token, config['SECRET'], algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AccessError('Token has expired')
    except jwt.InvalidTokenError:
        raise AccessError('Invalid token')

    user_id = token['user_id']

    filter = {'_id': ObjectId(user_id)}

    changed_values = {"$set": 	{
        'preferences': new_preferences
    }}

    result = db.users.update_one(filter, changed_values)
    if result.matched_count == 0:
        raise AccessError('User ID not found on database')
    response = make_response({'message': 'Successful Preferences Change'})
    return response


def get_user_preferences(token):
    #  split from profile details for now, will see if it needs to be integrated together later
    try:
        token = jwt.decode(token, config['SECRET'], algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AccessError('Token has expired')
    except jwt.InvalidTokenError:
        raise AccessError('Invalid token')

    user_id = token['user_id']

    # Check token validity
    user = db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise AccessError('User not found')

    return {
        'preferences': user.get('preferences', [])
    }
