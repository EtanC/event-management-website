# this middleware helps us protect routes that should not be accessible, eg. admin page.
from flask import request, g
from functools import wraps
from src.error import AccessError
from src.auth import decode_token

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.cookies.get('token')
        if not token:
            raise AccessError('Authorization token is missing or invalid')
        
        user_id = decode_token(token)
        g.user_id = user_id  # Store user_id in the global context
        return f(*args, **kwargs)
    
    return decorated
