import requests
from backend.test_src.util import parse_response, backend_url, make_cookies

def user_register_event(token, event_id):
    cookies = make_cookies(token)
    response = requests.post(f'{backend_url}/user/register/{event_id}', cookies=cookies)
    return parse_response(response)
def user_events(token):
    cookies = make_cookies(token)
    response = requests.get(f'{backend_url}/user/events', cookies=cookies)
    return parse_response(response)
def user_manage_events(token):
    cookies = make_cookies(token)
    response = requests.get(f'{backend_url}/user/manage/events', cookies=cookies)
    return parse_response(response)
def user_unregister_event(token, event_id):
    cookies = make_cookies(token)
    response = requests.post(f'{backend_url}/user/unregister/{event_id}', cookies=cookies)
    return parse_response(response)
def user_get_all(token):
    cookies = make_cookies(token)
    response = requests.get(f'{backend_url}/user/get/all', cookies=cookies)
    return parse_response(response)
def user_delete(token, to_be_deleted):
    cookies = make_cookies(token)
    body = {
        'user_id': to_be_deleted,
    }
    response = requests.delete(f'{backend_url}/user/delete', cookies=cookies, json=body)
    return parse_response(response)