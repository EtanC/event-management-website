import requests
from backend.test_src.util import parse_response, backend_url, make_cookies

def event_create(token, event):
    body = {
        'deadline': event['deadline'],
        'details': event['details'],
        'details_link': event['details_link'],
        'name': event['name'],
        'location': event['location'],
        'start_date': event['start_date'],
    }
    cookies = make_cookies(token)
    response = requests.post(f'{backend_url}/event/create', json=body, cookies=cookies)
    return parse_response(response)
def event_update(token, event_id, new_event):
    body = {
        'deadline': new_event['deadline'],
        'details': new_event['details'],
        'details_link': new_event['details_link'],
        'name': new_event['name'],
        'location': new_event['location'],
        'start_date': new_event['start_date']
    }
    cookies = make_cookies(token)
    response = requests.put(f'{backend_url}/event/update/{event_id}', json=body, cookies=cookies)
    return parse_response(response)
def event_delete(token, event_id):
    cookies = make_cookies(token)
    response = requests.delete(f'{backend_url}/event/delete/{event_id}', cookies=cookies)
    return parse_response(response)
def event_authorize(token, event_id, email):
    body = {
        'email': email,
        'event_id': event_id
    }
    cookies = make_cookies(token)
    response = requests.post(f'{backend_url}/event/authorize', json=body, cookies=cookies)
    return parse_response(response)
def events_crawl():
    response = requests.post(f'{backend_url}/events/crawl')
    return parse_response(response)
def events_get_all():
    response = requests.get(f'{backend_url}/events/get/all')
    return parse_response(response)
def events_clear():
    response = requests.delete(f'{backend_url}/events/clear')
    return parse_response(response)
def events_ai_description():
    response = requests.post(f'{backend_url}/events/ai-description')
    return parse_response(response)