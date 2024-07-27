import pytest
from backend.test_src.events import event_create, events_get_all
from backend.test_src.auth import auth_register_raw
from backend.test_src.user import user_events, user_register_event, user_manage_events, user_unregister_event
from backend.test_src.database import clear_all
from backend.test_src.events import event_authorize, event_delete
from backend.src.error import InputError, AccessError
from backend.src.config import config
import jwt
from dotenv import load_dotenv
import os

@pytest.fixture
def sample_event():
    return {
        'deadline': '1 July 2024',
        'details': 'This is a great event, everyone should come',
        'details_link': 'http://www.realeventpage.com',
        'name': 'A real event',
        'location': 'Lesotho, South Africa',
        'start_date': '30 June 2024'
    }

@pytest.fixture
def sample_user():
    response = auth_register_raw('johncena', 'johnsmith123@outlook.com', 'testing')
    token = response.cookies.get('token')
    return token

@pytest.fixture(autouse=True)
def reset():
    clear_all()

@pytest.fixture(scope='session', autouse=True)
def load_env_variables():
    load_dotenv()

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
    user_unregister_event(sample_user, event_id)
    assert user_events(sample_user)['events'] == []

def test_user_register_event_twice(sample_event, sample_user):
    event_id = event_create(sample_user, sample_event)['event_id']
    user_register_event(sample_user, event_id)
    with pytest.raises(InputError):
        user_register_event(sample_user, event_id)

def test_user_event_deleted(sample_event, sample_user):
    event_id = event_create(sample_user, sample_event)['event_id']
    user_register_event(sample_user, event_id)
    event_delete(sample_user, event_id)
    assert user_events(sample_user)['events'] == []

def test_no_events_for_user(sample_user):
    assert user_events(sample_user)['events'] == []

def test_event_created_by_different_user(sample_event):
    response1 = auth_register_raw('user1', 'user1@example.com', 'password1')
    token1 = response1.cookies.get('token')

    response2 = auth_register_raw('user2', 'user2@example.com', 'password2')
    token2 = response2.cookies.get('token')

    event_id = event_create(token1, sample_event)['event_id']
    expected_event = {
        **sample_event,
        '_id': event_id
    }
    
    user_register_event(token2, event_id)
    assert_event_equal(user_events(token2)['events'][0], expected_event)
    assert user_events(token1)['events'] == []

def test_user_register_and_delete_event(sample_event, sample_user):
    event_id = event_create(sample_user, sample_event)['event_id']
    expected_event = {
        **sample_event,
        '_id': event_id
    }
    user_register_event(sample_user, event_id)
    assert_event_equal(user_events(sample_user)['events'][0], expected_event)

    event_delete(sample_user, event_id)
    assert events_get_all()['events'] == []
    assert user_events(sample_user)['events'] == []

def test_register_event_invalid_user(sample_event, sample_user):
    invalid_token = "invalid_token"
    event_id = event_create(sample_user, sample_event)['event_id']
    with pytest.raises(AccessError):
        user_register_event(invalid_token, event_id)

def test_register_invalid_event(sample_user):
    invalid_event_id = "invalid_event_id"
    with pytest.raises(InputError):
        user_register_event(sample_user, invalid_event_id)

def decode_token(token):
    data = jwt.decode(token, os.getenv('AUTH_SECRET'), algorithms=['HS256'])
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
    response = auth_register_raw('user2', 'user2@user2.com', 'user2')
    user2 = response.cookies.get('token')
    event1_id = event_create(user2, event1)['event_id']
    # user creates event 2
    event2_id = event_create(sample_user, event2)['event_id']
    # user manages event 1
    event_authorize(user2, event1_id, 'johnsmith123@outlook.com')
    expected_event1['_id'] = event1_id
    expected_event2['_id'] = event2_id
    # Check that events returned are what we expect
    events = user_manage_events(sample_user)
    assert_event_equal(events['creator'][0], expected_event2)
    assert_event_equal(events['manager'][0], expected_event1)