import requests
from test_src.util import parse_response, backend_url, make_cookies

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
    cookies = make_cookies(token)
    response = requests.post(f'{backend_url}/auth/logout', cookies=cookies)
    return parse_response(response)
def auth_login_raw(email, password):
    body = {
        'email': email,
        'password': password,
    }
    response = requests.post(f'{backend_url}/auth/login', json=body)
    return response
def auth_register_raw(username, email, password):
    body = {
        'email': email,
        'password': password,
        'username': username
    }
    response = requests.post(f'{backend_url}/auth/register', json=body)
    return response
def auth_logout_raw(token):
    cookies = make_cookies(token)
    response = requests.post(f'{backend_url}/auth/logout', cookies=cookies)
    return response