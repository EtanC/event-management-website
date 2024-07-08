import requests
from backend.test_src.util import parse_response, backend_url, token_header

def get_profile_details(token):
    header = token_header(token)
    response = requests.get(f'{backend_url}/profile/get', headers=header)
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
    header = token_header(token)
    response = requests.post(f'{backend_url}/profile/update/details', data=body, headers=header, files=files)
    return parse_response(response)
def update_profile_password(token, old_password, new_password, re_password):
    body = {
        'old_password': old_password,
        'new_password': new_password,
        're_password': re_password,
    }
    header = token_header(token)
    response = requests.post(f'{backend_url}/profile/update/password', json=body, headers=header)
    return parse_response(response)