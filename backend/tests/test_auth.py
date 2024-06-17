import pytest
from backend.src.auth import AuthModule
from backend.tests.fake_database import FakeDatabase
from backend.src.error import InputError

@pytest.fixture
def user1():
    return {
        'username': 'John',
        'email': 'johnsmith1234@outlook.com',
        'password': '12345678',
    }
@pytest.fixture
def auth():
    return AuthModule(FakeDatabase())

def test_auth(auth, user1):
    # user is given a token when registering
    tkn2 = auth.register(user1['username'], user1['email'], user1['password'])['token']
    assert isinstance(tkn2, str)
    # user is given a token when logging in
    tkn1 = auth.login(user1['email'], user1['password'])['token']
    assert isinstance(tkn1, str)

def test_auth_error(auth, user1):
    # registering with the same email gives an error
    tkn2 = auth.register(user1['username'], user1['email'], user1['password'])['token']
    with pytest.raises(InputError):
        auth.register(user1['username'], user1['email'], user1['password'])['token']
    # logging in with the wrong email gives an error
    with pytest.raises(InputError):
        auth.login("wrong email", user1['password'])['token']