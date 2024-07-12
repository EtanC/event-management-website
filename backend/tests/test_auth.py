import pytest
from backend.test_src.auth import auth_login_raw, auth_logout, auth_register_raw, auth_login, auth_register
from backend.src.error import InputError
from backend.test_src.database import clear_all
import jwt
from backend.src.config import config
import datetime

@pytest.fixture
def user1():
    return {
        'username': 'John',
        'email': 'johnsmith1234@outlook.com',
        'password': '12345678',
    }

@pytest.fixture(autouse=True)
def reset():
    clear_all()

def test_auth_register_sets_cookie(user1):
    response = auth_register_raw(user1['username'], user1['email'], user1['password'])
    token = response.cookies.get('token')
    assert token is not None

def test_auth_login_sets_cookie(user1):
    auth_register_raw(user1['username'], user1['email'], user1['password'])
    response = auth_login_raw(user1['email'], user1['password'])
    token = response.cookies.get('token')
    assert token is not None

def test_auth_error(user1):
    auth_register(user1['username'], user1['email'], user1['password'])
    # Registering with the same email gives an error
    with pytest.raises(InputError):
        auth_register(user1['username'], user1['email'], user1['password'])
    # Logging in with the wrong email gives an error
    with pytest.raises(InputError):
        auth_login("wrong email", user1['password'])

def test_auth_register_token_contents(user1):
    response = auth_register_raw(user1['username'], user1['email'], user1['password'])
    token = response.cookies.get('token')
    data = jwt.decode(token, config['SECRET'], algorithms=['HS256'])

    # Check JWT token contains the right things
    assert sorted(data.keys()) == ['session_end_time', 'session_id', 'user_id']

    # Check data type of values
    assert isinstance(data['user_id'], str)
    assert isinstance(data['session_id'], str)
    assert isinstance(datetime.datetime.strptime(data['session_end_time'], "%Y-%m-%d %H:%M:%S.%f"), datetime.datetime)

def test_auth_login_token_contents(user1):
    auth_register_raw(user1['username'], user1['email'], user1['password'])
    response = auth_login_raw(user1['email'], user1['password'])
    token = response.cookies.get('token')
    data = jwt.decode(token, config['SECRET'], algorithms=['HS256'])

    # Check JWT token contains the right things
    assert sorted(data.keys()) == ['session_end_time', 'session_id', 'user_id']

    # Check data type of values
    assert isinstance(data['user_id'], str)
    assert isinstance(data['session_id'], str)
    assert isinstance(datetime.datetime.strptime(data['session_end_time'], "%Y-%m-%d %H:%M:%S.%f"), datetime.datetime)
