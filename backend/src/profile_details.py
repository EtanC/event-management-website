from backend.src.error import AccessError, InputError
from backend.src.database import db
from backend.src.config import config
from backend.src.auth import hash
from bson import ObjectId
import jwt

# NOTE: keeping contact info as just email for now until we hear more


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

    return {'username': f"{user['username']}",
            'email': f"{user['email']}",
            'description': f"{user['description']}",
            'full_name': f"{user['full_name']}",
            'job_title': f"{user['job_title']}",
            'fun_fact': f"{user['fun_fact']}"}

# mayeb won't deal with profile pics first, but might have to use GridFS to store on mongoDB


def update_profile_details(token, username, email, description, full_name, job_title, fun_fact, preferences):

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
    if email:
        changed_values['$set']['email'] = email
    if description:
        changed_values['$set']['description'] = description
    if full_name:
        changed_values['$set']['full_name'] = full_name
    if job_title:
        changed_values['$set']['job_title'] = job_title
    if fun_fact:
        changed_values['$set']['fun_fact'] = fun_fact
    if preferences:
        changed_values['$set']['preferences'] = preferences
    # if profile_pic:
    # 	changed_values['$set']['profile_pic'] = profile_pic

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

    if old_password and hashed_old_password == user['password'] and new_password == re_password:
        changed_values['$set']['password'] = hash(new_password)
    result = db.users.update_one(filter, changed_values)
    if result.matched_count == 0:
        raise AccessError('User ID not found on database')
