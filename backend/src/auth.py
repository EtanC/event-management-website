import os

import requests
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
        data = jwt.decode(token, os.getenv('AUTH_SECRET'), algorithms=['HS256'])
        if db.active_sessions.find_one({'_id': ObjectId(data['session_id'])}) is None:
            raise AccessError('Expired token')
        if db.users.find_one({'_id': ObjectId(data['user_id'])}) is None:
            raise AccessError('Invalid user')
        return data['user_id']
    except (jwt.InvalidSignatureError, jwt.DecodeError) as e:
        raise AccessError('Invalid token')


def encode_jwt(data):
    return jwt.encode(data, os.getenv('AUTH_SECRET'), algorithm='HS256')


def hash(string):
    return hashlib.sha256(string.encode()).hexdigest()


def add_login_session(user_id):
    # Calculate end time
    session_end_time = datetime.datetime.now(
    ) + datetime.timedelta(minutes=config['MINUTES_TILL_TIMEOUT'])
    # Use separate table to keep track of sessions
    response = db.active_sessions.insert_one(
        {
            'user_id': user_id,
            'session_end_time': session_end_time.isoformat()
        },
    )
    return (response.inserted_id, session_end_time)


def auth_google_login(auth_code):
    data = {
        'code': auth_code,
        'client_id': os.getenv("GOOGLE_CLIENT_ID"),
        'client_secret': os.getenv("GOOGLE_CLIENT_SECRET"),
        'redirect_uri': 'postmessage',
        'grant_type': 'authorization_code'
    }

    response = requests.post(
        'https://oauth2.googleapis.com/token', data=data).json()

    headers = {
        'Authorization': f'Bearer {response["access_token"]}'
    }
    user_info = requests.get(
        'https://www.googleapis.com/oauth2/v3/userinfo', headers=headers).json()
    email = user_info['email']
    match = db.users.find_one({'email': email})

    if match:
        # case where they have an account but its not logged in by google
        if 'password' in match:
            raise InputError("Account found but not via Google")
        session_id, session_end_time = add_login_session(match['_id'])
        token = encode_jwt({
            'user_id': str(match["_id"]),
            'session_id': str(session_id),
            'session_end_time': str(session_end_time)
        })
        response = make_response(
            {'message': 'Login successful', 'session_end_time': session_end_time.isoformat()})
        response.set_cookie(
            key='token',
            value=token,
            httponly=True,
            secure=False,
            samesite='Lax',
            expires=session_end_time,
            path='/'
        )
        return response
    else:
        user = db.users.insert_one({
            'username': user_info["name"],
            'email': email,
            'profile_pic_id': None,
            'full_name': None,
            'job_title': None,
            'fun_fact': None,
            'description': None,
            'profile_pic': None,
            'registered_events': [],
            'managed_events': [],
            'owned_events': [],
            'isAdmin': False,
            'receive_notifications': True,
            'notifications_sent': {
                'one_day': [],
                'three_days': [],
                'seven_days': []
            }
        })
        session_id, session_end_time = add_login_session(user.inserted_id)
        token = encode_jwt({
            'user_id': str(user.inserted_id),
            'session_id': str(session_id),
            'session_end_time': str(session_end_time)
        })

        response = make_response(
            {'message': 'Registration successful', 'session_end_time': session_end_time.isoformat()})
        response.set_cookie('token', token, httponly=True,
                            secure=False, samesite='Lax', expires=session_end_time)
        return response


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
    response = make_response(
        {'message': 'Login successful', 'session_end_time': session_end_time.isoformat()})

    # Set a cookie on the response object
    response.set_cookie(
        key='token',
        value=token,
        httponly=True,
        secure=False,
        samesite='Lax',
        expires=session_end_time,
        path='/'
    )
    return response


def auth_register(username, email, password, full_name, job_title, fun_fact, description, preferences):
    if db.users.find_one({'email': email}) is not None:
        raise InputError('Email is already being used')
    elif db.users.find_one({'username': username}) is not None:
        raise InputError('Username is already taken')
    user = db.users.insert_one({
        'username': username,
        'email': email,
        'profile_pic_id': None,
        'full_name': full_name,
        'job_title': job_title,
        'fun_fact': fun_fact,
        'description': description,
        'profile_pic': None,
        'password': hash(password),
        'registered_events': [],
        'preferences': preferences,
        'managed_events': [],
        'owned_events': [],
        'isAdmin': False,
        'receive_notifications': True,
        'notifications_sent': {
            'one_day': [],
            'three_days': [],
            'seven_days': []
        }
    })
    session_id, session_end_time = add_login_session(user.inserted_id)
    token = encode_jwt({
        'user_id': str(user.inserted_id),
        'session_id': str(session_id),
        'session_end_time': str(session_end_time)
    })

    response = make_response(
        {'message': 'Registration successful', 'session_end_time': session_end_time.isoformat()})
    response.set_cookie('token', token, httponly=True,
                        secure=False, samesite='Lax', expires=session_end_time)
    return response


def auth_logout(token):
    data = jwt.decode(token, os.getenv('AUTH_SECRET'), algorithms=['HS256'])
    db.active_sessions.delete_one({'_id': ObjectId(data['session_id'])})

    response = make_response({'message': 'Logout successful'})
    response.delete_cookie('token')
    return response
