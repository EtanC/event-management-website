import pytest
from backend.test_src.auth import auth_register_raw
from backend.test_src.events import event_create, event_update, event_delete, events_get_all, events_get_tagged
from backend.test_src.database import clear_all
from backend.src.admin import make_admin
from backend.src.error import AccessError, InputError
from backend.src.database import db


@pytest.fixture
def sample_event():
    event = {
        'deadline': 'Jul 1, 2024',
        'details': 'This is a great event, everyone should come',
        'details_link': 'http://www.realeventpage.com',
        'name': 'A real event',
        'location': 'Lesotho, South Africa',
        'start_date': 'Jun 30, 2024'
    }
    return event


@pytest.fixture
def event_tag_1():
    event = {
        'deadline': '1 July 2024',
        'details': 'This is a great event, everyone should come',
        'details_link': 'http://www.realeventpage.com',
        'name': 'AI',
        'location': 'Lesotho, South Africa',
        'start_date': '30 June 2024',
        'tags': ['Artificial Intelligence']
    }
    return event

@pytest.fixture
def event_tag_2():
    event = {
        'deadline': '1 July 2024',
        'details': 'This is a great event, everyone should come',
        'details_link': 'http://www.realeventpage.com',
        'name': 'AI + SE',
        'location': 'Lesotho, South Africa',
        'start_date': '30 June 2024',
        'tags': ['Artificial Intelligence', 'Software Engineering']
    }
    return event


@pytest.fixture
def event_tag_3():
    event = {
        'deadline': '1 July 2024',
        'details': 'This is a great event, everyone should come',
        'details_link': 'http://www.realeventpage.com',
        'name': 'AI + SE + DS',
        'location': 'Lesotho, South Africa',
        'start_date': '30 June 2024',
        'tags': ['Artificial Intelligence', 'Software Engineering', 'Data Science']
    }
    return event


@pytest.fixture
def sample_user():
    response = auth_register_raw(
        'John', 'johnsmith1234@outlook.com', '12345678', None, None, None, None, None)
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
        'deadline': 'Jul 2, 2024',
        'details': 'This is a somewhat ok event, everyone should come',
        'details_link': 'http://www.notrealeventpage.com',
        'name': 'A not so real event',
        'location': 'Benin, West Africa',
        'start_date': 'Jul 1, 2024'
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

def test_event_tags(reset, event_tag_1, event_tag_2, event_tag_3, sample_user):
    event_id_1 = event_create(sample_user, event_tag_1)['event_id']
    event_id_2 = event_create(sample_user, event_tag_2)['event_id']
    event_id_3 = event_create(sample_user, event_tag_3)['event_id']

    expected_event_1 = {
        **event_tag_1,
        '_id': str(event_id_1),
        'ranking': 0
    }

    expected_event_2 = {
        **event_tag_2,
        '_id': str(event_id_2),
        'ranking': 0
    }

    expected_event_3 = {
        **event_tag_3,
        '_id': str(event_id_3),
        'ranking': 0
    }

    assert events_get_tagged(['Human-Computer Interaction'])['events'] == []

    assert events_get_tagged(['Human-Computer Interaction', 'Artificial Intelligence'])['events'] == []

    # assert events_get_tagged(['Artificial Intelligence'])['events'] == [event_tag_1, event_tag_2, event_tag_3]
    result = events_get_tagged(['Artificial Intelligence'])['events']

    assert len(result) == 3
    for index, expected_event in enumerate([expected_event_1, expected_event_2, expected_event_3]):
        for key in expected_event.keys():
            assert result[index][key] == expected_event[key]

    # assert events_get_tagged(['Artificial Intelligence', 'Software Engineering'])['events'] == [event_tag_2, event_tag_3]
    result = events_get_tagged(['Artificial Intelligence', 'Software Engineering'])['events']

    assert len(result) == 2
    for index, expected_event in enumerate([expected_event_2, expected_event_3]):
        for key in expected_event.keys():
            assert result[index][key] == expected_event[key]

    # assert events_get_tagged(['Artificial Intelligence', 'Software Engineering', 'Data Science'])['events'] == [event_tag_3]
    result = events_get_tagged(['Artificial Intelligence', 'Software Engineering', 'Data Science'])['events']

    assert len(result) == 1
    for index, expected_event in enumerate([expected_event_3]):
        for key in expected_event.keys():
            assert result[index][key] == expected_event[key]


def test_event_creation(reset, sample_event, sample_user):
    assert events_get_all()['events'] == []
    expected_event = {**sample_event}
    event_id = event_create(sample_user, sample_event)['event_id']
    for key in expected_event.keys():
        assert events_get_all()['events'][0][key] == expected_event[key]


def test_event_update(reset, sample_event, sample_user):
    event_id = event_create(sample_user, sample_event)['event_id']
    updated_event = {
        'deadline': 'Jul 2, 2024',
        'details': 'This is a somewhat ok event, everyone should come',
        'details_link': 'http://www.notrealeventpage.com',
        'name': 'A not so real event',
        'location': 'Benin, West Africa',
        'start_date': 'Jul 1, 2024'
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
        'deadline': 'Jul 2, 2024',
        'details': 'This is a somewhat ok event, everyone should come',
        'details_link': 'http://www.notrealeventpage.com',
        'name': 'A not so real event',
        'location': 'Benin, West Africa',
        'start_date': 'Jul 1, 2024'
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
        'full_name': 'Admin',
        'description': 'final year student from UNSW',
        'job_title': 'student',
        'fun_fact': 'test data',
        'preferences': ['Computer Vision', 'Robotics']
    }
    response = auth_register_raw(
        admin_details['username'],
        admin_details['email'],
        admin_details['password'],
        admin_details['full_name'],
        admin_details['description'],
        admin_details['job_title'],
        admin_details['fun_fact'],
        admin_details['preferences'],
    )
    admin = response.cookies.get('token')
    make_admin(admin_details['username'])
    event_id = event_create(sample_user, sample_event)['event_id']
    sample_event['name'] = 'some other event name'
    event_update(admin, event_id, sample_event)
    assert events_get_all()['events'][0]['name'] == 'some other event name'
    event_delete(admin, event_id)
    assert len(events_get_all()['events']) == 0
