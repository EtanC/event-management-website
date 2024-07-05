import pytest
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
def reset():
    clear('events')

@pytest.fixture(scope='session', autouse=True)
def move_to_test_db():
    db.set_test_db()

def test_event(reset, sample_event):
    assert events_get_all()['events'] == []
    event_id = event_create(sample_event)['event_id']
    expected_event = {
        **sample_event,
        '_id': str(event_id),
        'ranking': 0,
    }
    assert events_get_all()['events'] == [expected_event]
    updated_event = {
        'deadline': '2 July 2024',
        'details': 'This is a somewhat ok event, everyone should come',
        'details_link': 'http://www.notrealeventpage.com',
        'name': 'A not so real event',
        'location': 'Benin, West Africa',
        'start_date': '1 July 2024'
    }
    event_update(event_id, updated_event)
    expected_event = {
        **updated_event,
        '_id': str(event_id),
        'ranking': 0,
    }
    assert events_get_all()['events'] == [expected_event]
    event_delete(event_id)
    assert events_get_all()['events'] == []
