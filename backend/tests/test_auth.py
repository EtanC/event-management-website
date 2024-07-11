import pytest
from backend.src.auth import auth_login, auth_logout, auth_register
from backend.src.error import InputError
from backend.src.database import clear, db
import jwt
from backend.src.config import config
import datetime
from backend.src.app import create_app

@pytest.fixture(scope='session')
def app():
    app = create_app()
    app.config.update({
        "TESTING": True,
    })

    with app.app_context():
        yield app

@pytest.fixture
def user1():
    return {
        'username': 'John',
        'email': 'johnsmith1234@outlook.com',
        'password': '12345678',
    }
@pytest.fixture(autouse=True)
def reset():
    clear('users')
    clear('active_sessions')

@pytest.fixture(scope='session', autouse=True)
def move_to_test_db():
    db.set_test_db()

def test_auth_register_sets_cookie(user1):
    with app.test_request_context():
        response = auth_register(user1['username'], user1['email'], user1['password'])
        cookies = response.headers.getlist('Set-Cookie')
        assert any('token=' in cookie for cookie in cookies)

def test_auth_login_sets_cookie(user1):
    with app.test_request_context():
        auth_register(user1['username'], user1['email'], user1['password'])
        response = auth_login(user1['email'], user1['password'])
        cookies = response.headers.getlist('Set-Cookie')
        assert any('token=' in cookie for cookie in cookies)

def test_auth(user1):
    with app.test_request_context():
        # User is given a token when registering
        response = auth_register(user1['username'], user1['email'], user1['password'])
        token = response.cookies.get('token')
        assert isinstance(token, str)
        
        # User is given a token when logging in
        response = auth_login(user1['email'], user1['password'])
        token = response.cookies.get('token')
        assert isinstance(token, str)


def test_auth_error(user1):
    with app.test_request_context():
        auth_register(user1['username'], user1['email'], user1['password'])
        # Registering with the same email gives an error
        with pytest.raises(InputError):
            auth_register(user1['username'], user1['email'], user1['password'])
        # Logging in with the wrong email gives an error
        with pytest.raises(InputError):
            auth_login("wrong email", user1['password'])

def test_auth_register_token_contents(user1):
    with app.test_request_context():
        response = auth_register(user1['username'], user1['email'], user1['password'])
        token = response.cookies.get('token')
        data = jwt.decode(token, config['SECRET'], algorithms=['HS256'])
        
        # Check JWT token contains the right things
        assert sorted(data.keys()) == ['session_end_time', 'session_id', 'user_id']
        
        # Check data type of values
        assert isinstance(data['user_id'], str)
        assert isinstance(data['session_id'], str)
        assert isinstance(datetime.datetime.strptime(data['session_end_time'], "%Y-%m-%d %H:%M:%S.%f"), datetime.datetime)

def test_auth_login_token_contents(user1):
    with app.test_request_context():
        auth_register(user1['username'], user1['email'], user1['password'])
        response = auth_login(user1['email'], user1['password'])
        token = response.cookies.get('token')
        data = jwt.decode(token, config['SECRET'], algorithms=['HS256'])

        # Check JWT token contains the right things
        assert sorted(data.keys()) == ['session_end_time', 'session_id', 'user_id']

        # Check data type of values
        assert isinstance(data['user_id'], str)
        assert isinstance(data['session_id'], str)
        assert isinstance(datetime.datetime.strptime(data['session_end_time'], "%Y-%m-%d %H:%M:%S.%f"), datetime.datetime)