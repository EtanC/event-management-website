import pytest
from backend.test_src.events import event_create, events_get_all
from backend.test_src.auth import auth_register
from backend.test_src.user import user_events, user_register_event
from backend.test_src.database import clear_all

@pytest.fixture
def sample_event():
    event = {
        'deadline': '1 July 2024',
        'details': 'This is a great event, everyone should come',
        'details_link': 'http://www.realeventpage.com',
        'name': 'A real event',
        'location': 'Lesotho, South Africa',
        'start_date': '30 June 2024'
    }
    return event

@pytest.fixture
def sample_user():
    token = auth_register('johncena', 'johnsmith123@outlook.com', 'testing')['token']
    return token

@pytest.fixture
def reset():
    clear_all()

def test_user(reset, sample_event, sample_user):
    # create event
    event_id = event_create(sample_user, sample_event)['event_id']
    expected_event = {
        **sample_event,
        '_id': event_id
    }
    for key in expected_event.keys():
        assert events_get_all()['events'][0][key] == expected_event[key]
    user_register_event(sample_user, event_id)
    for key in expected_event.keys():
        assert user_events(sample_user)['events'][0][key] == expected_event[key]