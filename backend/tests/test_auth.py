import pytest
from backend.src.auth import auth_login, auth_logout, auth_register

@pytest.fixture
def user1():
    return {
        'username': 'John',
        'password': '12345678',
    }

def test_auth(user1):
    # user is given a token when logging in
    tkn1 = auth_login(user1['username'], user1['password'])['token']
    assert isinstance(tkn1, str)
    
    # user can log out
    auth_logout(tkn1)

    # user is given a token when registering
    tkn2 = auth_register(user1['username'], user1['password'])['token']
    assert isinstance(tkn2, str)

    # user can log out
    auth_logout(tkn2)