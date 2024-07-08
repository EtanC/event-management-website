import pytest
from backend.src.auth import auth_register 
from backend.src.admin import is_admin, invite_admin, remove_admin
from backend.src.error import InputError, AccessError
from backend.src.database import clear, db
import jwt


@pytest.fixture
def user1():
    return {
        'username': 'John',
        'email': 'johnsmith1234@outlook.com',
        'password': 'Ilovesmith123!',
    }


@pytest.fixture
def user2():
    return {
        'username': 'Ben',
        'email': 'hiimben@gmail.com',
        'password': 'BenBen321!'
    }

@pytest.fixture
def reset():
    clear('users')

@pytest.fixture(scope='session', autouse=True)
def move_to_test_db():
    db.set_test_db()

def generate_random_jwt():
    payload = {
        'user_id': str('random'),
        'session_id': str('wow'),
        'session_end_time': str('hi')
    }

    token = jwt.encode(payload, 'NOTASECRET', algorithm='HS256')
    return token

def make_admin(username):
    # for testing, as there has to be an admin initially to invite and / or remove admin
    filter = {'username': username}
    result = db.users.update_one(filter, {'$set': {'isAdmin': True}})


def test_default(reset, user1):
    token = auth_register(user1['username'], user1['email'], user1['password'])['token']

    assert is_admin(token) == False

    make_admin(user1['username'])

    assert is_admin(token) == True

def test_invite_admin(reset, user1, user2):
    token = auth_register(user1['username'], user1['email'], user1['password'])['token']
    token2 = auth_register(user2['username'], user2['email'], user2['password'])['token']

    make_admin(user1['username'])

    assert is_admin(token2) == False

    invite_admin(token, user2['username'])

    assert is_admin(token2) == True

def test_remove_admin(reset, user1, user2):
    token = auth_register(user1['username'], user1['email'], user1['password'])['token']
    token2 = auth_register(user2['username'], user2['email'], user2['password'])['token']

    make_admin(user1['username'])
    make_admin(user2['username'])

    assert is_admin(token2) == True

    remove_admin(token, user2['username'])

    assert is_admin(token2) == False

def test_is_admin_error(reset):
    random_token = generate_random_jwt()

    with pytest.raises(AccessError):
        is_admin(random_token)

def test_invite_admin_error(reset, user1, user2):
    token = auth_register(user1['username'], user1['email'], user1['password'])['token']
    token2 = auth_register(user2['username'], user2['email'], user2['password'])['token']

    random_token = generate_random_jwt()

    # test wrong token
    with pytest.raises(AccessError):
        invite_admin(random_token, user2['username'])

    # test user is not an admin
    with pytest.raises(AccessError):
        invite_admin(token, user2['username'])

    make_admin(user1['username'])

    # test provided username doesn't exist
    with pytest.raises(InputError):
        invite_admin(token, 'wawawathisusernamedoestexist')

def test_remove_admin_error(reset, user1, user2):
    token = auth_register(user1['username'], user1['email'], user1['password'])['token']
    token2 = auth_register(user2['username'], user2['email'], user2['password'])['token']

    random_token = generate_random_jwt()

    # test wrong token
    with pytest.raises(AccessError):
        remove_admin(random_token, user2['username'])

    # test user is not an admin
    with pytest.raises(AccessError):
        remove_admin(token, user2['username'])

    make_admin(user1['username'])

    # test provided username doesn't exist
    with pytest.raises(InputError):
        remove_admin(token, 'wawawathisusernamedoestexist')

