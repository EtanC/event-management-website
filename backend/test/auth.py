import requests
from backend.test.util import parse_response, backend_url

def auth_login(email, password):
    body = {
        'email': email,
        'password': password,
    }
    response = requests.post(f'{backend_url}/auth/login', json=body)
    return parse_response(response)
def auth_register(username, email, password):
    body = {
        'email': email,
        'password': password,
        'username': username
    }
    response = requests.post(f'{backend_url}/auth/register', json=body)
    return parse_response(response)
def auth_logout(token):
    header = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {token}'
    }
    response = requests.post(f'{backend_url}/auth/logout', headers=header)
    return parse_response(response)