import pytest
from backend.src.events import event_create, events_get_all
from backend.src.auth import auth_register
from backend.src.user import user_events, user_register_event
from backend.src.database import clear, db

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
    response = auth_register('johncena', 'johnsmith123@outlook.com', 'testing')
    token = response.cookies.get('token')
    return token


@pytest.fixture
def reset():
    clear('events')
    clear('users')

@pytest.fixture(scope='session', autouse=True)
def move_to_test_db():
    db.set_test_db()

def test_user(reset, sample_event, sample_user):
    # create event
    event_id = event_create(sample_user, sample_event)['event_id']
    expected_event = {
        **sample_event,
        '_id': event_id
    }
    assert events_get_all()['events'] == [expected_event]
    user_register_event(sample_user, event_id)
    assert user_events(sample_user)['events'] == [expected_event]

def test_user_register_event_twice(reset, sample_event, sample_user):
    # create event
    event_id = event_create(sample_user, sample_event)['event_id']
    user_register_event(sample_user, event_id)
    with pytest.raises(InputError):
        user_register_event(sample_user, event_id)

def test_user_event_deleted(reset, sample_event, sample_user):
    # create event
    event_id = event_create(sample_user, sample_event)['event_id']
    user_register_event(sample_user, event_id)
    event_delete(sample_user, event_id)
    assert user_events(sample_user)['events'] == []

def test_no_events_for_user(reset, sample_user):
    assert user_events(sample_user)['events'] == []

def test_event_created_by_different_user(reset, sample_event):
    # Register two users
    response1 = auth_register('user1', 'user1@example.com', 'password1')
    token1 = response1.cookies.get('token')

    response2 = auth_register('user2', 'user2@example.com', 'password2')
    token2 = response2.cookies.get('token')

    # User 1 creates an event
    event_id = event_create(token1, sample_event)['event_id']
    expected_event = {
        **sample_event,
        '_id': event_id
    }
    
    # User 2 registers for the event
    user_register_event(token2, event_id)
    
    # Check that User 2's registered events include the new event
    assert user_events(token2)['events'] == [expected_event]
    
    # Check that User 1's registered events do not include the event they created unless they explicitly register for it
    assert user_events(token1)['events'] == []

def test_user_register_and_delete_event(reset, sample_event, sample_user):
    # create event
    event_id = event_create(sample_user, sample_event)['event_id']
    expected_event = {
        **sample_event,
        '_id': event_id
    }
    user_register_event(sample_user, event_id)
    assert user_events(sample_user)['events'] == [expected_event]

    # User deletes the event
    event_delete(sample_user, event_id)
    assert events_get_all()['events'] == []
    assert user_events(sample_user)['events'] == []

def test_register_event_invalid_user(reset, sample_event):
    invalid_token = "invalid_token"
    event_id = event_create(sample_user, sample_event)['event_id']
    with pytest.raises(InputError):
        user_register_event(invalid_token, event_id)

def test_register_invalid_event(reset, sample_user):
    invalid_event_id = "invalid_event_id"
    with pytest.raises(InputError):
        user_register_event(sample_user, invalid_event_id)