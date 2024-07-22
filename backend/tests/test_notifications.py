import pytest
from test_src.auth import auth_register_raw
from test_src.events import event_create
from test_src.user import user_register_event
from src.events import event_create
from src.user import check_notifications, user_toggle_notifications
from src.database import clear, db
from datetime import datetime, timedelta

@pytest.fixture
def sample_event():
    # shouldn't send any reminders
    event = {
        'deadline': '1 July 2024',
        'details': 'This is a great event, everyone should come',
        'details_link': 'http://www.realeventpage.com',
        'name': 'A real event',
        'location': 'Lesotho, South Africa',
        'start_date': '30 January 2026'
    }
    return event

@pytest.fixture
def sample_event_1():
    date = datetime.now() + timedelta(days=1)
    event = {
        'deadline': '1 July 2024',
        'details': 'This is a great event, everyone should come',
        'details_link': 'http://www.realeventpage.com',
        'name': 'A real event',
        'location': 'Lesotho, South Africa',
        'start_date': date.strftime("%d %B %Y")
    }
    return event

@pytest.fixture
def sample_event_3():
    date = datetime.now() + timedelta(days=3)
    event = {
        'deadline': '1 July 2024',
        'details': 'This is a great event, everyone should come',
        'details_link': 'http://www.realeventpage.com',
        'name': 'A real event',
        'location': 'Lesotho, South Africa',
        'start_date': date.strftime("%d %B %Y")
    }
    return event

@pytest.fixture
def sample_event_7():
    date = datetime.now() + timedelta(days=7)
    event = {
        'deadline': '1 July 2024',
        'details': 'This is a great event, everyone should come',
        'details_link': 'http://www.realeventpage.com',
        'name': 'A real event',
        'location': 'Lesotho, South Africa',
        'start_date': date.strftime("%d %B %Y")
    }
    return event

@pytest.fixture
def sample_user():
    # use your real email to check if the notification is sent
    response = auth_register_raw('kevchen', 'kchen397@gmail.com', 'testing')
    token = response.cookies.get('token')
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

def test_reminders_none(reset, sample_event, sample_user):
    # should be no remindesr since event is far away
    event_id = event_create(sample_user, sample_event)['event_id']
    user_register_event(sample_user, event_id)
    check_notifications()

def test_reminders(reset, sample_event_1, sample_event_3, sample_event_7, sample_user):
    # check for all reminders
    event_id = event_create(sample_user, sample_event_1)['event_id']
    user_register_event(sample_user, event_id)
    event_id = event_create(sample_user, sample_event_3)['event_id']
    user_register_event(sample_user, event_id)
    event_id = event_create(sample_user, sample_event_7)['event_id']
    user_register_event(sample_user, event_id)
    
    check_notifications()

def test_notifications_off(reset, sample_event_1, sample_event_3, sample_event_7, sample_user):
    # toggle off notifications
    user_toggle_notifications(sample_user)

    # register shouldn't send notifications
    event_id = event_create(sample_user, sample_event_1)['event_id']
    user_register_event(sample_user, event_id)
    event_id = event_create(sample_user, sample_event_3)['event_id']
    user_register_event(sample_user, event_id)
    event_id = event_create(sample_user, sample_event_7)['event_id']
    user_register_event(sample_user, event_id)
    
    check_notifications()

def test_notifications_toggled_off_then_on(reset, sample_event_1, sample_event_3, sample_event_7, sample_user):
    # create event
    # toggle notifications off then on
    user_toggle_notifications(sample_user)
    user_toggle_notifications(sample_user)

    # register should send notifications
    event_id = event_create(sample_user, sample_event_1)['event_id']
    user_register_event(sample_user, event_id)
    event_id = event_create(sample_user, sample_event_3)['event_id']
    user_register_event(sample_user, event_id)
    event_id = event_create(sample_user, sample_event_7)['event_id']
    user_register_event(sample_user, event_id)
    
    check_notifications()