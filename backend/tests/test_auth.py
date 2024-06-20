import pytest
from backend.src.auth import auth_login, auth_logout, auth_register
from backend.src.error import InputError
from backend.src.database import clear

@pytest.fixture
def user1():
    return {
        'username': 'John',
        'email': 'johnsmith1234@outlook.com',
        'password': '12345678',
    }
@pytest.fixture
def reset():
    clear('users')


def test_auth(reset, user1):
    # user is given a token when registering
    tkn2 = auth_register(user1['username'], user1['email'], user1['password'])['token']
    assert isinstance(tkn2, str)
    # user is given a token when logging in
    tkn1 = auth_login(user1['email'], user1['password'])['token']
    assert isinstance(tkn1, str)

def test_auth_error(reset, user1):
    # registering with the same email gives an error
    tkn2 = auth_register(user1['username'], user1['email'], user1['password'])['token']
    with pytest.raises(InputError):
        auth_register(user1['username'], user1['email'], user1['password'])['token']
    # logging in with the wrong email gives an error
    with pytest.raises(InputError):
        auth_login("wrong email", user1['password'])['token']