import requests
from backend.test_src.util import parse_response, backend_url, token_header

def user_register_event(token, event_id):
    header = token_header(token)
    response = requests.post(f'{backend_url}/user/register/{event_id}', headers=header)
    return parse_response(response)
def user_events(token):
    header = token_header(token)
    response = requests.get(f'{backend_url}/user/events', headers=header)
    return parse_response(response)
def user_manage_events(token):
    header = token_header(token)
    response = requests.get(f'{backend_url}/user/manage/events', headers=header)
    return parse_response(response)