import pytest
from backend.test_src.events import event_create, events_get_all
from backend.test_src.auth import auth_register
from backend.test_src.user import user_events, user_register_event, user_manage_events
from backend.test_src.database import clear_all
from backend.test_src.events import event_authorize
from backend.src.database import clear, db
from backend.src.config import config
import jwt

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

def decode_token(token):
    data = jwt.decode(token, config['SECRET'], algorithms=['HS256'])
    return data['user_id']

def assert_event_equal(event, expected_event):
    for key in expected_event.keys():    
        assert event[key] == expected_event[key]

def test_user_manage_events(reset, sample_event, sample_user):
    event1 = sample_event
    event2 = {
        'deadline': '2 July 2024',
        'details': 'This is a somewhat ok event, everyone should come',
        'details_link': 'http://www.notrealeventpage.com',
        'name': 'A not so real event',
        'location': 'Benin, West Africa',
        'start_date': '1 July 2024'
    }
    expected_event1 = { **event1 }
    expected_event2 = { **event2 }
    user2 = auth_register('user2', 'user2@user2.com', 'user2')['token']
    event1_id = event_create(user2, event1)['event_id']
    # user creates event 2
    event2_id = event_create(sample_user, event2)['event_id']
    # user manages event 1
    event_authorize(user2, event1_id, decode_token(sample_user))
    expected_event1['_id'] = event1_id
    expected_event2['_id'] = event2_id
    # Check that events returned are what we expect
    events = user_manage_events(sample_user)
    assert_event_equal(events['creator'][0], expected_event2)
    assert_event_equal(events['manager'][0], expected_event1)
