from backend.src.error import AccessError, InputError
from backend.src.database import db, fs
from backend.src.config import config
from backend.src.auth import hash
from bson import ObjectId
import jwt
import hashlib
import base64
import string


def get_profile_details(token):
    try:
        token = jwt.decode(token, config['SECRET'], algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AccessError('Token has expired')
    except jwt.InvalidTokenError:
        raise AccessError('Invalid token')

    user_id = token['user_id']

    # check token validity
    user = db.users.find_one({"_id": ObjectId(user_id)})
    file_id = user['profile_pic_id']

    if file_id is not None:
        file_data = fs.get(file_id).read()
        encoded_image = base64.b64encode(file_data)  # not sure if this works
    else:
        encoded_image = None  # or could make it a default profile pic

    return {
        'username': f"{user['username']}",
        'email': f"{user['email']}",
        'profile_pic': encoded_image,
        'description': f"{user['description']}",
        'full_name': f"{user['full_name']}",
        'job_title': f"{user['job_title']}",
        'fun_fact': f"{user['fun_fact']}"
    }


def update_profile_details(token, username, description, full_name, job_title, fun_fact, profile_pic):
    try:
        token = jwt.decode(token, config['SECRET'], algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AccessError('Token has expired')
    except jwt.InvalidTokenError:
        raise AccessError('Invalid token')

    user_id = token['user_id']

    filter = {'_id': ObjectId(user_id)}

    user = db.users.find_one({"_id": ObjectId(user_id)})
    changed_values = {"$set": {}}

    if username:
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
        # value was passed for profile_pic
        # store the profile pic onto gridfs
        file_id = fs.put(profile_pic)
        # store profile pic id that is used to reference gridfs
        changed_values['$set']['profile_pic_id'] = file_id

    result = db.users.update_one(filter, changed_values)
    if result.matched_count == 0:
        raise AccessError('User ID not found on database')


def update_profile_password(token, old_password, new_password, re_password):
    try:
        token = jwt.decode(token, config['SECRET'], algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AccessError('Token has expired')
    except jwt.InvalidTokenError:
        raise AccessError('Invalid token')

    user_id = token['user_id']

    filter = {'_id': ObjectId(user_id)}

    user = db.users.find_one({"_id": ObjectId(user_id)})
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
