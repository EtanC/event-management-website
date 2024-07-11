import pytest
from backend.src.profile_details import get_profile_details, update_profile_details, update_profile_password
from backend.src.auth import auth_register, auth_login
from backend.src.error import InputError, AccessError
from backend.src.database import clear, db
import jwt
from io import BytesIO
import base64

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
        'password': 'ilovesmith123!',
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


def test_get_profile(reset, user1):
    with app.test_request_context():
        response = auth_register(user1['username'], user1['email'], user1['password'])
        token = response.cookies.get('token')
        request.cookies = {'token': token}
        details = get_profile_details(token)
        assert(details == { 'username': 'John',
                            'email': 'johnsmith1234@outlook.com',
                            'profile_pic': None,
                            'description': None,
                            'full_name': None,
                            'fun_fact': None,
                            'job_title': None})

def test_get_profile_error(reset, user1):
    random_token = generate_random_jwt()
    # test invalid token
    with pytest.raises(AccessError):
        get_profile_details(random_token)

def test_update_profile(reset, user1):
    with app.test_request_context():
        response = auth_register(user1['username'], user1['email'], user1['password'])
        token = response.cookies.get('token')
        request.cookies = {'token': token}

        new_usr = 'Steven'
        new_email = 'steven@gmail.com'
        new_description = 'thegoat'
        new_full_name = 'Goat'
        new_job_title = 'King'
        new_fun_fact = 'imthegoat'

        # test update username
        update_profile_details(token, new_usr, None, None, None, None, None)
        assert(get_profile_details(token) == {  'username': new_usr,
                                                'email': 'johnsmith1234@outlook.com',
                                                'description': None,
                                                'full_name': None,
                                                'fun_fact': None,
                                                'job_title': None,
                                                'profile_pic': None })

        # test update description
        update_profile_details(token, None, new_description, None, None, None, None)
        assert(get_profile_details(token) == {  'username': new_usr,
                                                'email': user1['email'],
                                                'description': new_description,
                                                'full_name': None,
                                                'fun_fact': None,
                                                'job_title': None,
                                                'profile_pic': None })
        
        # test update full name
        update_profile_details(token, None, None, new_full_name, None, None, None)
        assert(get_profile_details(token) == {  'username': new_usr,
                                                'email': user1['email'],
                                                'description': new_description,
                                                'full_name': new_full_name,
                                                'fun_fact': None,
                                                'job_title': None,
                                                'profile_pic': None })
        
        # test update job title
        update_profile_details(token, None, None, None, new_job_title, None, None)
        assert(get_profile_details(token) == {  'username': new_usr,
                                                'email': user1['email'],
                                                'description': new_description,
                                                'full_name': new_full_name,
                                                'fun_fact': None,
                                                'job_title': new_job_title,
                                                'profile_pic': None })
        
        # test update fun fact
        update_profile_details(token, None, None, None, None, new_fun_fact, None)
        assert(get_profile_details(token) == {  'username': new_usr,
                                                'email': user1['email'],
                                                'description': new_description,
                                                'full_name': new_full_name,
                                                'fun_fact': new_fun_fact,
                                                'job_title': new_job_title,
                                                'profile_pic': None })
        
        # test update profile pic
        with open('backend/src/profile_imgs/test_img.jpeg', 'rb') as img:
            update_profile_details(token, None, None, None, None, None, img)

        profile_details = get_profile_details(token)
        encoded_image = profile_details.get('profile_pic')
        decoded_image = base64.b64decode(encoded_image)

        # image will be shown on the folder for visual testing
        with open('backend/src/profile_imgs/retrieved_img.jpeg', 'wb') as img:
            img.write(decoded_image)

        with open('backend/src/profile_imgs/test_img.jpeg', 'rb') as img:
            img_data = img.read()

        assert decoded_image == img_data

def test_update_profile_error(reset, user1):
    with app.test_request_context():
        response = auth_register(user1['username'], user1['email'], user1['password'])
        token = response.cookies.get('token')
        request.cookies = {'token': token}
        
        random_token = generate_random_jwt()

        # test invalid token
        with pytest.raises(AccessError):
            update_profile_details(random_token, 'newusr', 'newemail', None, None, None, None)

def test_update_password(reset, user1):
    with app.test_request_context():
        response = auth_register(user1['username'], user1['email'], user1['password'])
        token = response.cookies.get('token')
        request.cookies = {'token': token}

        new_password = 'ilovejohn312*'

        update_profile_password(token, user1['password'], new_password, new_password)
        response = auth_login(user1['email'], new_password)
        new_token = response.cookies.get('token')
        assert isinstance(new_token, str)

def test_update_password_error(reset, user1):
    with app.test_request_context():
        response = auth_register(user1['username'], user1['email'], user1['password'])
        token = response.cookies.get('token')
        request.cookies = {'token': token}

        new_password = 'ilovejohn312*'
        # test old password doesn't match on update password
        with pytest.raises(InputError):
            update_profile_password(token, 'ahuwdbawdahd123!', None, None)

        # test old password not given when trying to update password
        with pytest.raises(InputError):
            update_profile_password(token, None,  new_password, new_password)

        # test new passsword and re-entered password don't match on update password
        with pytest.raises(InputError):
            update_profile_password(token, user1['password'], new_password, 'auiwdawbd123$')

        # test invalid password formats
        short_password = 'a1!'
        with pytest.raises(InputError):
            update_profile_password(token, user1['password'], short_password, short_password)

        no_special_character = 'abcdef123'
        with pytest.raises(InputError):
            update_profile_password(token, user1['password'], no_special_character, no_special_character)

        no_number = 'abcdef!@#$%'
        with pytest.raises(InputError):
            update_profile_password(token, user1['password'], no_number, no_number)