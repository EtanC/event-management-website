import requests
from backend.test_src.util import parse_response, backend_url, token_header

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
    header = token_header(token)
    response = requests.post(f'{backend_url}/auth/logout', headers=header)
    return parse_response(response)