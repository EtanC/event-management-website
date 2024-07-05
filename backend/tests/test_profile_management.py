import pytest
from backend.src.profile_details import get_profile_details, update_profile_details, update_profile_password
from backend.src.auth import auth_register, auth_login
from backend.src.error import InputError, AccessError
from backend.src.database import clear
import jwt
from io import BytesIO
import base64


@pytest.fixture
def user1():
    return {
        'username': 'John',
        'email': 'johnsmith1234@outlook.com',
        'password': 'ilovesmith123!',
    }


@pytest.fixture
def reset():
    clear('users')


def generate_random_jwt():
    payload = {
        'user_id': str('random'),
        'session_id': str('wow'),
        'session_end_time': str('hi')
    }

    token = jwt.encode(payload, 'NOTASECRET', algorithm='HS256')
    return token


def test_get_profile(reset, user1):
    token = auth_register(
        user1['username'], user1['email'], user1['password'])['token']
    details = get_profile_details(token)
    assert (details == {'username': 'John',
                        'email': 'johnsmith1234@outlook.com',
                        'profile_pic': None,
                        'description': 'None',
                        'full_name': 'None',
                        'fun_fact': 'None',
                        'job_title': 'None'})


def test_get_profile_error(reset, user1):
    random_token = generate_random_jwt()
    # test invalid token
    with pytest.raises(AccessError):
        get_profile_details(random_token)


def test_update_profile(reset, user1):
    token = auth_register(
        user1['username'], user1['email'], user1['password'])['token']

    new_usr = 'Steven'
    new_email = 'steven@gmail.com'

    # description, full_name, job_title, fun_fact

    new_description = 'thegoat'
    new_full_name = 'Goat'
    new_job_title = 'King'
    new_fun_fact = 'imthegoat'

    # test update username
    update_profile_details(token, new_usr, None, None, None, None, None, None)
    assert (get_profile_details(token) == {'username': new_usr,
                                           'email': 'johnsmith1234@outlook.com',
                                           'profile_pic': None,
                                           'description': 'None',
                                           'full_name': 'None',
                                           'fun_fact': 'None',
                                           'job_title': 'None'})
    # test update email
    update_profile_details(token, None, new_email,
                           None, None, None, None, None)
    assert (get_profile_details(token) == {'username': new_usr,
                                           'email': new_email,
                                           'profile_pic': None,
                                           'description': 'None',
                                           'full_name': 'None',
                                           'fun_fact': 'None',
                                           'job_title': 'None'})

    # test update password
    update_profile_details(
        token, None, None, user1['password'], new_password, new_password, None, None)
    tkn2 = auth_login(new_email, new_password)['token']
    assert isinstance(tkn2, str)

    # test update preferences
    update_profile_details(token, None, None, None, None, None, None, {'AI': True,
                                                                       'Machine Learning': False,
                                                                       'Computer Vision': True,
                                                                       'Computer Science': False
                                                                       })
    assert (get_profile_details(token) == {'username': new_usr,
                                           'email': new_email,
                                           'profile_pic': None,
                                           'preferences': {'AI': True,
                                                           'Machine Learning': False,
                                                           'Computer Vision': True,
                                                           'Computer Science': False
                                                           }})

    # test update all
    update_profile_details(token, 'John', 'john@gmail.com', None, None, None, None, {'AI': False,
                                                                                     'Machine Learning': True,
                                                                                     'Computer Vision': False,
                                                                                     'Computer Science': True
                                                                                     })
    assert (get_profile_details(token) == {'username': 'John',
                                           'email': 'john@gmail.com',
                                           'profile_pic': None,
                                           'preferences': {'AI': False,
                                                           'Machine Learning': True,
                                                           'Computer Vision': False,
                                                           'Computer Science': True
                                                           }})

    # test update profile pic
    with open('backend/src/profile_imgs/test_img.jpg', 'rb') as img:
        update_profile_details(token, None, None, None, None, None, img, None)

    profile_details = get_profile_details(token)
    encoded_image = profile_details.get('profile_pic')
    decoded_image = base64.b64decode(encoded_image)

    # image will be shown on the folder for visual testing
    with open('backend/src/profile_imgs/retrieved_img.jpg', 'wb') as img:
        img.write(decoded_image)

    with open('backend/src/profile_imgs/test_img.jpg', 'rb') as img:
        img_data = img.read()

    assert decoded_image == img_data

    # test update description
    update_profile_details(token, None, new_description,
                           None, None, None, None)
    assert (get_profile_details(token) == {'username': new_usr,
                                           'email': user1['email'],
                                           'description': new_description,
                                           'full_name': 'None',
                                           'fun_fact': 'None',
                                           'job_title': 'None'})

    # test update full name
    update_profile_details(token, None, None, new_full_name, None, None, None)
    assert (get_profile_details(token) == {'username': new_usr,
                                           'email': user1['email'],
                                           'description': new_description,
                                           'full_name': new_full_name,
                                           'fun_fact': 'None',
                                           'job_title': 'None'})

    # test update job title
    update_profile_details(token, None, None, None, new_job_title, None, None)
    assert (get_profile_details(token) == {'username': new_usr,
                                           'email': user1['email'],
                                           'description': new_description,
                                           'full_name': new_full_name,
                                           'fun_fact': 'None',
                                           'job_title': new_job_title})

    # test update fun fact
    update_profile_details(token, None, None, None, None, new_fun_fact, None)
    assert (get_profile_details(token) == {'username': new_usr,
                                           'email': user1['email'],
                                           'description': new_description,
                                           'full_name': new_full_name,
                                           'fun_fact': new_fun_fact,
                                           'job_title': new_job_title})

    # ignoring these tests for now until preferences is complete

    # # test update preferences
    # update_profile_details(token, None, None, None, None, None, None, {   'AI': True,
    #                                                                 'Machine Learning': False,
    #                                                                 'Computer Vision': True,
    #                                                                 'Computer Science': False
    #                                                             })
    # assert(get_profile_details(token) == {  'username': new_usr,
    #                                         'email': new_email,
    #                                         'preferences': {    'AI': True,
    #                                                             'Machine Learning': False,
    #                                                             'Computer Vision': True,
    #                                                             'Computer Science': False
    #                                                         }})

    # # test update all
    # update_profile_details(token, 'John', 'john@gmail.com', None, None, None, None, {   'AI': False,
    #                                                                                 'Machine Learning': True,
    #                                                                                 'Computer Vision': False,
    #                                                                                 'Computer Science': True
    #                                                                                 })
    # assert(get_profile_details(token) == {  'username': 'John',
    #                                         'email': 'john@gmail.com',
    #                                         'preferences': {    'AI': False,
    #                                                             'Machine Learning': True,
    #                                                             'Computer Vision': False,
    #                                                             'Computer Science': True
    #                                                         }})


def test_update_profile_error(reset, user1):
    token = auth_register(
        user1['username'], user1['email'], user1['password'])['token']

    random_token = generate_random_jwt()

    # test invalid token
    with pytest.raises(AccessError):
        update_profile_details(random_token, 'newusr',
                               'newemail', None, None, None, None, None)

    # test old password doesn't match on update password
    with pytest.raises(InputError):
        update_profile_details(token, None, None, 'abc',
                               None, None, None, None)

    # test old password not given when trying to update password
    with pytest.raises(InputError):
        update_profile_details(token, None, None, None,
                               'abc', 'abc', None, None)

    # test new passsword and re-entered password don't match on update password
    with pytest.raises(InputError):
        update_profile_details(
            token, None, None, user1['password'], 'abc', 'def', None, None)
        update_profile_details(random_token, 'newusr',
                               'newemail', None, None, None, None)


def test_update_password(reset, user1):
    token = auth_register(
        user1['username'], user1['email'], user1['password'])['token']
    new_password = 'ilovejohn312*'

    update_profile_password(
        token, user1['password'], new_password, new_password)
    tkn2 = auth_login(user1['email'], new_password)['token']
    assert isinstance(tkn2, str)


def test_update_password_error(reset, user1):
    token = auth_register(
        user1['username'], user1['email'], user1['password'])['token']
    new_password = 'ilovejohn312*'
    # test old password doesn't match on update password
    with pytest.raises(InputError):
        update_profile_password(token, 'ahuwdbawdahd123!', None, None)

    # test old password not given when trying to update password
    with pytest.raises(InputError):
        update_profile_password(token, None,  new_password, new_password)

    # test new passsword and re-entered password don't match on update password
    with pytest.raises(InputError):
        update_profile_password(
            token, user1['password'], new_password, 'auiwdawbd123$')

    # test invalid password formats

    short_password = 'a1!'
    with pytest.raises(InputError):
        update_profile_password(
            token, user1['password'], short_password, short_password)

    no_special_character = 'abcdef123'
    with pytest.raises(InputError):
        update_profile_password(
            token, user1['password'], no_special_character, no_special_character)

    no_number = 'abcdef!@#$%'
    with pytest.raises(InputError):
        update_profile_password(token, user1['password'], no_number, no_number)
