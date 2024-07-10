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
    # use your real email to check if the notification is sent
    token = auth_register('kevchen', 'kchen397@gmail.com', 'testing')['token']
    return token

@pytest.fixture
def reset():
    clear('events')
    clear('users')

@pytest.fixture(scope='session', autouse=True)
def move_to_test_db():
    db.set_test_db()

def test_notification(reset, sample_event, sample_user):
    # create event
    event_id = event_create(sample_user, sample_event)['event_id']
    user_register_event(sample_user, event_id)
    # afaik have to check manually on ur email if the notification is sent