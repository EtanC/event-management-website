import requests
from backend.test_src.util import parse_response, backend_url, make_cookies

def is_admin(token):
    cookies = make_cookies(token)
    response = requests.get(f"{backend_url}/user/is_admin", cookies=cookies)
    return parse_response(response)

def invite_admin(token, username):
    cookies = make_cookies(token)
    body = {
        'username': username,
    }
    response = requests.post(f"{backend_url}/admin/invite_admin", json=body, cookies=cookies)
    return parse_response(response)

def remove_admin(token, username):
    cookies = make_cookies(token)
    body = {
        'username': username,
    }
    response = requests.post(f"{backend_url}/admin/remove_admin", json=body, cookies=cookies)
    return parse_response(response)