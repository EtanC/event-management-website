import pytest
from backend.src.auth import auth_register
from backend.src.events import event_create, event_update, event_delete, events_get_all
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
    token = auth_register('John', 'johnsmith1234@outlook.com', '12345678')['token']
    return token

@pytest.fixture
def reset():
    clear('users')
    clear('events')

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
