from backend.src.error import AccessError, InputError
from backend.src.database import db

def auth_login(email, password):
    match = db.users.find_one({ 'email': email, 'password': password })
    if match is None:
        raise InputError("Incorrect email or password")
    return {
        'token': f'{match["_id"]}'
    }

def auth_register(username, email, password):
    if db.users.find_one({ 'email': email }) is not None:
        raise InputError("Email is already being used")
    user = db.users.insert_one({
        'username': username,
        'email': email,
        'password': password,
        'preferences': {},
        'profile_pic': None
    })
    return {
        'token': f'{user.inserted_id}'
    }

def auth_logout(token):
    return {}