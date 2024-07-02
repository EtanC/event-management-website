import pytest
from backend.src.events import event_create, events_get_all
from backend.src.auth import auth_register
from backend.src.user import user_events, user_register_event
from backend.src.database import clear

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
    user = {
        'email': 'johnsmith123@outlook.com',
        'password': 'testing',
        'username': 'johncena'
    }
    return user

@pytest.fixture
def reset():
    clear('events')
    clear('users')

def test_user(reset, sample_event, sample_user):
    # create event
    event_id = event_create(sample_event)['event_id']
    expected_event = {
        **sample_event,
        '_id': event_id
    }
    assert events_get_all()['events'] == [expected_event]
    token = auth_register(**sample_user)['token']
    user_register_event(token, event_id)
    assert user_events(token)['events'] == [expected_event]
