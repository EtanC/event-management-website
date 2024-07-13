import requests
from backend.src.error import AccessError, InputError
from backend.src.config import config

backend_url = f"http://localhost:{config['BACKEND_PORT']}"

def parse_response(response):
    if response.status_code == 200:
        return response.json()
    elif response.status_code == 403:
        raise AccessError(response.json()['description'])
    elif response.status_code == 400:
        raise InputError(response.json()['description'])
    raise Exception(response.json()['description'])

def make_cookies(token):
    return {
        'token': f'{token}'
    }