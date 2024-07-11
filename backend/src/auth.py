from backend.src.error import AccessError, InputError
from backend.src.database import db
import datetime
import hashlib
from backend.src.config import config
import jwt
from bson.objectid import ObjectId
from flask import make_response

def decode_token(token):
    try:
        data = jwt.decode(token, config['SECRET'], algorithms=['HS256'])
    except (jwt.InvalidSignatureError, jwt.DecodeError) as e:
        raise AccessError('Invalid token')
    if db.active_sessions.find_one({ '_id': ObjectId(data['session_id'])}) is None:
        raise AccessError('Expired token')
    if db.users.find_one({ '_id': ObjectId(data['user_id'])}) is None:
        raise AccessError('Invalid user')
    return data['user_id']

def encode_jwt(data):
    return jwt.encode(data, config['SECRET'], algorithm='HS256')


def hash(string):
    return hashlib.sha256(string.encode()).hexdigest()


def add_login_session(user_id):
    # Calculate end time
    session_end_time = datetime.datetime.now() + datetime.timedelta(minutes=config['MINUTES_TILL_TIMEOUT'])
    # Use separate table to keep track of sessions
    response = db.active_sessions.insert_one(
        {
            'user_id': user_id,
            'session_end_time': session_end_time
        },
    )
    return (response.inserted_id, session_end_time)

def auth_login(email, password):
    match = db.users.find_one({'email': email, 'password': hash(password)})
    if match is None:
        raise InputError('Incorrect email or password')
    
    session_id, session_end_time = add_login_session(match['_id'])
    token = encode_jwt({
        'user_id': str(match["_id"]),
        'session_id': str(session_id),
        'session_end_time': str(session_end_time)
    })

    # Create a response object
    response = make_response({'message': 'Login successful', 'session_end_time': session_end_time})
    
    # Set a cookie on the response object
    response.set_cookie(
        key='token',
        value=token,
        httponly=False,  
        secure=False, 
        samesite='Lax', 
        expires=session_end_time,  
        path='/'
    )
    return response

def auth_register(username, email, password):
    if db.users.find_one({'email': email}) is not None:
        raise InputError('Email is already being used')
    user = db.users.insert_one({
        'username': username,
        'email': email,
        'profile_pic_id': None,
        'full_name': None,
        'job_title': None,
        'fun_fact': None,
        'description': None,
        'profile_pic': None,
        'password': hash(password),
        'registered_events': [],
        'managed_events': [],
        'owned_events': []
    })
    session_id, session_end_time = add_login_session(user.inserted_id)
    token = encode_jwt({
        'user_id': str(user.inserted_id),
        'session_id': str(session_id),
        'session_end_time': str(session_end_time)
    })

    response = make_response({'message': 'Registration successful', 'session_end_time': session_end_time})
    response.set_cookie('token', token, httponly=True, secure=False, samesite='Lax', expires=session_end_time)
    return response



def auth_logout():
    token = request.cookies.get('token')
    if not token:
        raise AccessError('Authorization token is missing or invalid')
    data = jwt.decode(token, config['SECRET'], algorithms=['HS256'])
    db.active_sessions.delete_one({'_id': ObjectId(data['session_id'])})

    response = make_response({'message': 'Logout successful'})
    response.delete_cookie('token')
    return response