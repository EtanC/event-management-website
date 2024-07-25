import pytest
from backend.test_src.auth import auth_register_raw
from backend.test_src.events import event_create, event_update, event_delete, events_get_all
from backend.test_src.database import clear_all
from backend.src.admin import make_admin
from backend.src.error import AccessError, InputError
from backend.src.database import db

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
    response = auth_register_raw('John', 'johnsmith1234@outlook.com', '12345678')
    token = response.cookies.get('token')
    return token

@pytest.fixture
def reset():
    clear_all()

@pytest.fixture(scope='session', autouse=True)
def move_to_test_db():
    db.set_test_db()

def test_event(reset, sample_event, sample_user):
    assert events_get_all()['events'] == []
    expected_event = {
        **sample_event,
    }
    event_id = event_create(sample_user, sample_event)['event_id']
    for key in expected_event.keys():    
        assert events_get_all()['events'][0][key] == expected_event[key]
    updated_event = {
        'deadline': '2 July 2024',
        'details': 'This is a somewhat ok event, everyone should come',
        'details_link': 'http://www.notrealeventpage.com',
        'name': 'A not so real event',
        'location': 'Benin, West Africa',
        'start_date': '1 July 2024'
    }
    event_update(sample_user, event_id, updated_event)
    expected_event = {
        **updated_event,
        '_id': str(event_id),
        'ranking': 0,
    }
    for key in expected_event.keys():    
        assert events_get_all()['events'][0][key] == expected_event[key]
    event_delete(sample_user, event_id)
    assert events_get_all()['events'] == []

def test_event_creation(reset, sample_event, sample_user):
    assert events_get_all()['events'] == []
    expected_event = {**sample_event}
    event_id = event_create(sample_user, sample_event)['event_id']
    for key in expected_event.keys():
        assert events_get_all()['events'][0][key] == expected_event[key]

def test_event_update(reset, sample_event, sample_user):
    event_id = event_create(sample_user, sample_event)['event_id']
    updated_event = {
        'deadline': '2 July 2024',
        'details': 'This is a somewhat ok event, everyone should come',
        'details_link': 'http://www.notrealeventpage.com',
        'name': 'A not so real event',
        'location': 'Benin, West Africa',
        'start_date': '1 July 2024'
    }
    event_update(sample_user, event_id, updated_event)
    expected_event = {
        **updated_event,
        '_id': str(event_id),
        'ranking': 0,
    }
    for key in expected_event.keys():
        assert events_get_all()['events'][0][key] == expected_event[key]

def test_event_delete(reset, sample_event, sample_user):
    event_id = event_create(sample_user, sample_event)['event_id']
    event_delete(sample_user, event_id)
    assert events_get_all()['events'] == []

def test_event_creation_without_auth(reset, sample_event):
    with pytest.raises(AccessError):
        event_create(None, sample_event)

def test_event_update_without_auth(reset, sample_event, sample_user):
    event_id = event_create(sample_user, sample_event)['event_id']
    updated_event = {
        'deadline': '2 July 2024',
        'details': 'This is a somewhat ok event, everyone should come',
        'details_link': 'http://www.notrealeventpage.com',
        'name': 'A not so real event',
        'location': 'Benin, West Africa',
        'start_date': '1 July 2024'
    }
    with pytest.raises(AccessError):
        event_update(None, event_id, updated_event)

def test_event_delete_without_auth(reset, sample_event, sample_user):
    event_id = event_create(sample_user, sample_event)['event_id']
    with pytest.raises(AccessError):
        event_delete(None, event_id)

def test_admin_can_edit_delete(reset, sample_event, sample_user):
    admin_details = {
        'username': 'admin',
        'email': 'admin@outlook.com',
        'password': 'iamtheadmin',
    }
    response = auth_register_raw(
        admin_details['username'],
        admin_details['email'],
        admin_details['password']
    )
    admin = response.cookies.get('token')
    make_admin(admin_details['username'])
    event_id = event_create(sample_user, sample_event)['event_id']
    sample_event['name'] = 'some other event name'
    event_update(admin, event_id, sample_event)
    assert events_get_all()['events'][0]['name'] == 'some other event name'
    event_delete(admin, event_id)
    assert len(events_get_all()['events']) == 0