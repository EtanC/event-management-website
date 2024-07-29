import requests
from backend.test_src.util import parse_response, backend_url, make_cookies

def get_profile_details(token):
    cookies = make_cookies(token)
    response = requests.get(f'{backend_url}/profile/get', cookies=cookies)
    return parse_response(response)


def update_profile_details(token, username, description, full_name, job_title, fun_fact, profile_pic):
    body = {
        'username': username,
        'description': description,
        'full_name': full_name,
        'job_title': job_title,
        'fun_fact': fun_fact,
    }
    files = {}
    if profile_pic is not None:
        files['profile_pic'] = profile_pic
    cookies = make_cookies(token)
    response = requests.post(f'{backend_url}/profile/update/details', data=body, cookies=cookies, files=files)
    return parse_response(response)


def update_profile_password(token, old_password, new_password, re_password):
    body = {
        'old_password': old_password,
        'new_password': new_password,
        're_password': re_password,
    }
    cookies = make_cookies(token)
    response = requests.post(f'{backend_url}/profile/update/password', json=body, cookies=cookies)
    return parse_response(response)

def update_preferences(token, new_preferences):
    body = {
        'new_preferences': new_preferences
    }
    cookies = make_cookies(token)
    response = requests.put(f'{backend_url}/profile/update/preferences', json=body, cookies=cookies)
    return parse_response(response)

def get_preferences(token):
    cookies = make_cookies(token)
    response = requests.get(f'{backend_url}/profile/get/preferences', cookies=cookies)
    return parse_response(response)