import pytest
from backend.test_src.profile_details import get_profile_details, update_profile_details, update_profile_password, update_preferences, get_preferences
from backend.test_src.auth import auth_register_raw, auth_login_raw
from backend.src.error import InputError, AccessError
from backend.test_src.database import clear_all
import jwt
from io import BytesIO
import base64


@pytest.fixture
def user1():
    return {
        'username': 'John',
        'email': 'johnsmith1234@outlook.com',
        'password': 'ilovesmith123!',
        'full_name': 'John Smith',
        'description': 'final year student from UNSW',
        'job_title': 'student',
        'fun_fact': 'test data',
        'preferences': ['Computer Vision', 'Robotics']
    }


@pytest.fixture
def user2():
    return {
        'username': 'John',
        'email': 'johnsmith1234@outlook.com',
        'password': 'ilovesmith123!',
        'full_name': None,
        'description': None,
        'job_title': None,
        'fun_fact': None,
        'preferences': None,
    }


@pytest.fixture(autouse=True)
def reset():
    clear_all()


def generate_random_jwt():
    payload = {
        'user_id': str('random'),
        'session_id': str('wow'),
        'session_end_time': str('hi')
    }
    token = jwt.encode(payload, 'NOTASECRET', algorithm='HS256')
    return token


def test_get_profile(reset, user1):
    response = auth_register_raw(
        user1['username'], user1['email'], user1['password'], user1['full_name'], user1['description'], user1['job_title'], user1['fun_fact'], user1['preferences'])
    token = response.cookies.get('token')
    details = get_profile_details(token)
    assert details == {'username': 'John',
                       'email': 'johnsmith1234@outlook.com',
                       'profile_pic': None,
                       'description': 'final year student from UNSW',
                       'is_admin': False,
                       'full_name': 'John Smith',
                       'fun_fact': 'test data',
                       'job_title': 'student',
                       'preferences': ['Computer Vision', 'Robotics'],
                       'receive_notifications': True}


def test_get_profile_error(reset, user1):
    random_token = generate_random_jwt()
    # test invalid token
    with pytest.raises(AccessError):
        get_profile_details(random_token)


def test_update_profile(reset, user2):
    response = auth_register_raw(user2['username'], user2['email'], user2['password'], user2['full_name'],
                                 user2['description'], user2['job_title'], user2['fun_fact'], user2['preferences'])
    token = response.cookies.get('token')

    new_usr = 'Steven'
    new_email = 'steven@gmail.com'
    new_description = 'thegoat'
    new_full_name = 'Goat'
    new_job_title = 'King'
    new_fun_fact = 'imthegoat'

    # test update username
    update_profile_details(token, new_usr, None, None, None, None, None)
    assert get_profile_details(token) == {'username': new_usr,
                                          'email': 'johnsmith1234@outlook.com',
                                          'description': None,
                                          'is_admin': False,
                                          'full_name': None,
                                          'fun_fact': None,
                                          'job_title': None,
                                          'profile_pic': None,
                                          'preferences': None,
                                          'receive_notifications': True}

    # test update description
    update_profile_details(token, None, new_description,
                           None, None, None, None)
    assert get_profile_details(token) == {'username': new_usr,
                                          'email': user2['email'],
                                          'description': new_description,
                                          'is_admin': False,
                                          'full_name': None,
                                          'fun_fact': None,
                                          'job_title': None,
                                          'profile_pic': None,
                                          'preferences': None,
                                          'receive_notifications': True}

    # test update full name
    update_profile_details(token, None, None, new_full_name, None, None, None)
    assert get_profile_details(token) == {'username': new_usr,
                                          'email': user2['email'],
                                          'description': new_description,
                                          'is_admin': False,
                                          'full_name': new_full_name,
                                          'fun_fact': None,
                                          'job_title': None,
                                          'profile_pic': None,
                                          'preferences': None,
                                          'receive_notifications': True}

    # test update job title
    update_profile_details(token, None, None, None, new_job_title, None, None)
    assert get_profile_details(token) == {'username': new_usr,
                                          'email': user2['email'],
                                          'description': new_description,
                                          'is_admin': False,
                                          'full_name': new_full_name,
                                          'fun_fact': None,
                                          'job_title': new_job_title,
                                          'profile_pic': None,
                                          'preferences': None,
                                          'receive_notifications': True}

    # test update fun fact
    update_profile_details(token, None, None, None, None, new_fun_fact, None)
    assert get_profile_details(token) == {'username': new_usr,
                                          'email': user2['email'],
                                          'description': new_description,
                                          'is_admin': False,
                                          'full_name': new_full_name,
                                          'fun_fact': new_fun_fact,
                                          'job_title': new_job_title,
                                          'profile_pic': None,
                                          'preferences': None,
                                          'receive_notifications': True}

    # test update profile pic
    with open('backend/src/profile_imgs/test_img.jpeg', 'rb') as img:
        update_profile_details(token, None, None, None, None, None, img)

        with open('backend/src/profile_imgs/test_img.jpeg', 'rb') as img:
            img_data = img.read()

    profile_details = get_profile_details(token)
    encoded_image = profile_details.get('profile_pic')
    decoded_image = base64.b64decode(encoded_image)

    # image will be shown on the folder for visual testing
    with open('backend/src/profile_imgs/retrieved_img.jpeg', 'wb') as img:
        img.write(decoded_image)

    with open('backend/src/profile_imgs/test_img.jpeg', 'rb') as img:
        img_data = img.read()

    assert decoded_image == img_data


def test_update_profile_error(reset, user2):
    response = auth_register_raw(user2['username'], user2['email'], user2['password'], user2['full_name'],
                                 user2['description'], user2['job_title'], user2['fun_fact'], user2['preferences'])
    token = response.cookies.get('token')

    matchingUsername = 'randomUsername'

    response = auth_register_raw(
        matchingUsername, 'randomEmail@outlook.com', 'randomPassword', None, None, None, None, None)
    token2 = response.cookies.get('token')

    random_token = generate_random_jwt()

    # test invalid token
    with pytest.raises(AccessError):
        update_profile_details(random_token, 'newusr',
                               'newemail', None, None, None, None)

    # test username already taken
    with pytest.raises(InputError):
        update_profile_details(token2, matchingUsername,
                               None, None, None, None, None)


def test_update_password(reset, user2):
    response = auth_register_raw(user2['username'], user2['email'], user2['password'], user2['full_name'],
                                 user2['description'], user2['job_title'], user2['fun_fact'], user2['preferences'])
    token = response.cookies.get('token')
    new_password = 'ilovejohn312*'

    update_profile_password(
        token, user2['password'], new_password, new_password)
    response = auth_login_raw(user2['email'], new_password)
    new_token = response.cookies.get('token')
    assert isinstance(new_token, str)


def test_update_password_error(reset, user2):
    response = auth_register_raw(user2['username'], user2['email'], user2['password'], user2['full_name'],
                                 user2['description'], user2['job_title'], user2['fun_fact'], user2['preferences'])
    token = response.cookies.get('token')

    new_password = 'ilovejohn312*'
    # test old password doesn't match on update password
    with pytest.raises(InputError):
        update_profile_password(token, 'ahuwdbawdahd123!', None, None)

        new_password = 'ilovejohn312*'
        # test old password doesn't match on update password
        with pytest.raises(InputError):
            update_profile_password(token, 'ahuwdbawdahd123!', None, None)

    # test new passsword and re-entered password don't match on update password
    with pytest.raises(InputError):
        update_profile_password(
            token, user2['password'], new_password, 'auiwdawbd123$')

    # test invalid password formats
    short_password = 'a1!'
    with pytest.raises(InputError):
        update_profile_password(
            token, user2['password'], short_password, short_password)

    no_special_character = 'abcdef123'
    with pytest.raises(InputError):
        update_profile_password(
            token, user2['password'], no_special_character, no_special_character)

    no_number = 'abcdef!@#$%'
    with pytest.raises(InputError):
        update_profile_password(token, user2['password'], no_number, no_number)


def test_update_preferences(reset, user2):
    response = auth_register_raw(user2['username'], user2['email'], user2['password'], user2['full_name'],
                                 user2['description'], user2['job_title'], user2['fun_fact'], user2['preferences'])
    token = response.cookies.get('token')

    preferences = ['AI', 'Computer Vision', 'Deep Learning', 'Block Chain']

    update_preferences(token, preferences)

    assert (get_preferences(token) == {'preferences': preferences})
