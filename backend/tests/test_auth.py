import pytest
from backend.src.auth import AuthModule
from backend.tests.fake_database import FakeDatabase

@pytest.fixture
def user1():
    return {
        'username': 'John',
        'password': '12345678',
    }
@pytest.fixture
def auth():
    return AuthModule(FakeDatabase())

def test_auth(auth, user1):
    # user is given a token when logging in
    tkn1 = auth.login(user1['username'], user1['password'])['token']
    assert isinstance(tkn1, str)
    
    # user can log out
    auth.logout(tkn1)

    # user is given a token when registering
    tkn2 = auth.register(user1['username'], user1['password'])['token']
    assert isinstance(tkn2, str)

    # user can log out
    auth.logout(tkn2)