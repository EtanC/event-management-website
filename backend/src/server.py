from flask import Flask, request, jsonify, make_response
from flasgger import Swagger, swag_from
from backend.swagger_doc.auth import auth_login_spec, auth_register_spec, auth_logout_spec
from backend.swagger_doc.events import events_crawl_spec, events_clear_spec, events_get_all_spec, event_create_spec, event_update_spec, event_delete_spec, event_authorize_spec, events_ai_description_spec, events_get_page_spec
from backend.swagger_doc.profile import profile_get_spec, profile_update_details_spec, profile_update_password_spec
from backend.swagger_doc.admin import admin_invite_spec, admin_remove_spec, is_admin_spec
from backend.swagger_doc.user import user_events_spec, user_register_event_spec, user_manage_events_spec, user_unregister_event_spec, user_toggle_notifications_spec, user_get_all_spec
from backend.swagger_doc.database import clear_spec
from backend.swagger_doc.definitions import definitions
from backend.src.error import AccessError, InputError
import json
from werkzeug.exceptions import HTTPException
from backend.src.auth import auth_google_login, auth_login, auth_register, auth_logout
from backend.src.events import events_crawl, events_clear, events_get_all, event_create, event_update, event_delete, event_authorize, events_ai_description, events_get_page
from backend.src.profile_details import get_profile_details, update_profile_details, update_profile_password
from backend.src.admin import is_admin, invite_admin, remove_admin
from backend.src.user import user_register_event, user_events, user_unregister_event, user_manage_events, user_toggle_notifications, user_get_all
from flask_cors import CORS
from backend.src.config import config
from backend.src.database import db
import sys
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app, expose_headers='Authorization', supports_credentials=True)
swagger = Swagger(app, template=definitions)


@app.errorhandler(HTTPException)
def access_error_handler(e):
    response = e.get_response()
    response.data = json.dumps({
        "code": e.code,
        "name": e.name,
        "description": e.description,
    })
    response.content_type = "application/json"
    return response


@app.post('/auth/login')
@swag_from(auth_login_spec)
def auth_login_route():
    body = request.get_json()
    return auth_login(body['email'], body['password'])


@app.post('/auth/google_login')
def auth_google_login_route():
  auth_code = request.get_json()['code']
  return auth_google_login(auth_code)

@app.post('/auth/register')
@swag_from(auth_register_spec)
def auth_register_route():
    body = request.get_json()
    return auth_register(body['username'], body['email'], body['password'])


@app.post('/auth/logout')
@swag_from(auth_logout_spec)
def auth_logout_route():
    token = request.cookies.get('token')
    if not token:
        raise AccessError('Authorization token is missing')
    return auth_logout(token)


@app.post('/events/crawl')
@swag_from(events_crawl_spec)
def events_crawl_route():
    return events_crawl()

@app.get('/events/get_page/<page_number>')
@swag_from(events_get_page_spec)
def events_get_page_route(page_number):
    return json.dumps(events_get_page(page_number, request.args.get('name'), request.args.get('location'), request.args.get('date')), default=str)

@app.get('/events/get/all')
@swag_from(events_get_all_spec)
def events_get_all_route():
    return events_get_all()


@app.delete('/events/clear')
@swag_from(events_clear_spec)
def events_clear_route():
    return events_clear()


@app.post('/events/ai-description')
@swag_from(events_ai_description_spec)
def events_ai_description_route():
    return events_ai_description()


@app.post('/event/create')
@swag_from(event_create_spec)
def event_create_route():
    token = request.cookies.get('token')
    if not token:
        raise AccessError('Authorization token is missing')
    body = request.get_json()
    event = {
        'deadline': body['deadline'],
        'details': body['details'],
        'details_link': body['details_link'],
        'name': body['name'],
        'location': body['location'],
        'start_date': body['start_date']
    }
    return event_create(token, event)


@app.put('/event/update/<event_id>')
@swag_from(event_update_spec)
def event_update_route(event_id):
    token = request.cookies.get('token')
    if not token:
        raise AccessError('Authorization token is missing')
    body = request.get_json()
    event = {
        'deadline': body['deadline'],
        'details': body['details'],
        'details_link': body['details_link'],
        'name': body['name'],
        'location': body['location'],
        'start_date': body['start_date']
    }
    return event_update(token, event_id, event)


@app.delete('/event/delete/<event_id>')
@swag_from(event_delete_spec)
def event_delete_route(event_id):
    token = request.cookies.get('token')
    if not token:
        raise AccessError('Authorization token is missing')
    return event_delete(token, event_id)


@app.post('/event/authorize')
@swag_from(event_authorize_spec)
def event_authorize_route():
    token = request.cookies.get('token')
    if not token:
        raise AccessError('Authorization token is missing')
    body = request.get_json()
    return event_authorize(token, body['event_id'], body['email'])

@app.get('/profile/get')
@swag_from(profile_get_spec)
def profile_get_route():
    token = request.cookies.get('token')
    if not token:
        raise AccessError('Authorization token is missing')

    return get_profile_details(token)


@app.post('/profile/update/details')
@swag_from(profile_update_details_spec)
def profile_update_details_route():
    token = request.cookies.get('token')
    if not token:
        raise AccessError('Authorization token is missing')

    username = request.form.get('username')
    description = request.form.get('description')
    full_name = request.form.get('full_name')
    job_title = request.form.get('job_title')
    fun_fact = request.form.get('fun_fact')

    profile_pic = None
    if 'profile_pic' in request.files:
        file = request.files['profile_pic']
        if file and file.filename:
            profile_pic = file.read()

    return update_profile_details(token, username, description, full_name, job_title, fun_fact, profile_pic)


@app.post('/profile/update/password')
@swag_from(profile_update_password_spec)
def profile_update_password_route():
    token = request.cookies.get('token')
    if not token:
        raise AccessError('Authorization token is missing')

    body = request.get_json()

    return update_profile_password(token, body['old_password'], body['new_password'], body['re_password'])


@app.get('/user/is_admin')
@swag_from(is_admin_spec)
def is_admin_route():
    token = request.cookies.get('token')
    if not token:
        raise AccessError('Authorization token is missing')

    return json.dumps(is_admin(token))


@app.post('/admin/invite_admin')
@swag_from(admin_invite_spec)
def invite_admin_route():
    token = request.cookies.get('token')
    if not token:
        raise AccessError('Authorization token is missing')
    body = request.get_json()

    return json.dumps(invite_admin(token, body['username']))


@app.post('/admin/remove_admin')
@swag_from(admin_remove_spec)
def remove_admin_route():
    token = request.cookies.get('token')
    if not token:
        raise AccessError('Authorization token is missing')
    body = request.get_json()

    return json.dumps(remove_admin(token, body['username']))


@app.get('/user/events')
@swag_from(user_events_spec)
def user_events_route():
    token = request.cookies.get('token')
    if not token:
        raise AccessError('Authorization token is missing')

    return user_events(token)


@app.get('/user/manage/events')
@swag_from(user_manage_events_spec)
def user_manage_events_route():
    token = request.cookies.get('token')

    if not token:
        raise AccessError('Authorization token is missing')

    return user_manage_events(token)


@app.post('/user/register/<event_id>')
@swag_from(user_register_event_spec)
def user_register_event_route(event_id):
    token = request.cookies.get('token')
    if not token:
        raise AccessError('Authorization token is missing')

    return json.dumps(user_register_event(token, event_id))


@app.post('/user/unregister/<event_id>')
@swag_from(user_unregister_event_spec)
def user_unregister_event_route(event_id):
    token = request.cookies.get('token')
    if not token:
        raise AccessError('Authorization token is missing')
    return json.dumps(user_unregister_event(token, event_id))

@app.put('/user/toggle_notifications')
@swag_from(user_toggle_notifications_spec)
def user_toggle_notifications_route():
    token = request.cookies.get('token')

    if token.startswith('Bearer '):
        token = token[len('Bearer '):]

    return user_toggle_notifications(token)

@app.get('/user/get/all')
@swag_from(user_get_all_spec)
def user_get_all_route():
    token = request.cookies.get('token')
    if not token:
        raise AccessError('Authorization token is missing')
    return json.dumps(user_get_all(token))

@app.delete('/clear')
@swag_from(clear_spec)
def clear_all():
    db.clear_all()
    return json.dumps({})


if __name__ == '__main__':
    load_dotenv()
    if len(sys.argv) > 1 and sys.argv[1] == 'test':
        db.set_test_db()
        print("==========================================")
        print("running server.py on test mode")
        print("==========================================")
    app.run(port=config['BACKEND_PORT'], debug=True, host='0.0.0.0')