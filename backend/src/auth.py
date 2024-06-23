from backend.src.error import AccessError, InputError
from backend.src.database import db
import datetime
import hashlib
from backend.src.config import config
import jwt

def encode_jwt(data):
    return jwt.encode(data, config['SECRET'], algorithm='HS256')

def hash(string):
    return hashlib.sha256(string.encode()).hexdigest()

def add_login_session(user_id):
    # Calculate end time
    session_end_time = datetime.datetime.today() + datetime.timedelta(minutes=config['MINUTES_TILL_TIMEOUT'])
    # Use separate table to keep track of sessions
    response = db.active_sessions.insert_one(
        {
            'user_id': user_id,
            'session_end_time': session_end_time
        },
    )
    return (response.inserted_id, session_end_time)

def auth_login(email, password):
    match = db.users.find_one({ 'email': email, 'password': hash(password) })
    if match is None:
        raise InputError('Incorrect email or password')
    session_id, session_end_time = add_login_session(match['_id'])
    token = encode_jwt({
        'user_id': str(match["_id"]),
        'session_id': str(session_id),
        'session_end_time': str(session_end_time)
    })
    return {
        'token': token
    }

def auth_register(username, email, password):
    if db.users.find_one({ 'email': email }) is not None:
        raise InputError('Email is already being used')
    user = db.users.insert_one({
        'username': username,
        'email': email,
        'password': hash(password),
        'active_sessions': {}
    })
    session_id, session_end_time = add_login_session(user.inserted_id)
    token = encode_jwt({
        'user_id': str(user.inserted_id),
        'session_id': str(session_id),
        'session_end_time': str(session_end_time)
    })
    return {
        'token': token
    }

def auth_logout(token):
    return {}