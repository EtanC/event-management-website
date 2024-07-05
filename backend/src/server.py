from flask import Flask, request
from flasgger import Swagger, swag_from
from backend.swagger_doc.auth import auth_login_spec, auth_register_spec, auth_logout_spec
from backend.swagger_doc.events import events_crawl_spec, events_clear_spec, events_get_all_spec, event_create_spec, event_update_spec, event_delete_spec
from backend.swagger_doc.profile import profile_get_spec, profile_update_details_spec, profile_update_password_spec
from backend.swagger_doc.user import user_events_spec, user_register_event_spec
from backend.swagger_doc.definitions import definitions
from backend.src.error import AccessError, InputError
import json
from werkzeug.exceptions import HTTPException
from backend.src.auth import auth_login, auth_register, auth_logout
from backend.src.events import events_crawl, events_clear, events_get_all, event_create, event_update, event_delete
from backend.src.profile_details import get_profile_details, update_profile_details, update_profile_password
from backend.src.user import user_register_event, user_events
from flask_cors import CORS
from backend.src.config import config

app = Flask(__name__)
cors = CORS(app, expose_headers='Authorization')
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
    return json.dumps(auth_login(body['email'], body['password']))


@app.post('/auth/register')
@swag_from(auth_register_spec)
def auth_register_route():
    body = request.get_json()
    return json.dumps(auth_register(body['username'], body['email'], body['password']))


@app.post('/auth/logout')
@swag_from(auth_logout_spec)
def auth_logout_route():
    body = request.get_json()
    return json.dumps(auth_logout(body['token']))


@app.post('/events/crawl')
@swag_from(events_crawl_spec)
def events_crawl_route():
    return json.dumps(events_crawl())


@app.get('/events/get/all')
@swag_from(events_get_all_spec)
def events_get_all_route():
    return json.dumps(events_get_all())


@app.delete('/events/clear')
@swag_from(events_clear_spec)
def events_clear_route():
    return json.dumps(events_clear())


@app.post('/event/create')
@swag_from(event_create_spec)
def event_create_route():
    body = request.get_json()
    return json.dumps(event_create(body['event']))


@app.put('/event/update/<event_id>')
@swag_from(event_update_spec)
def event_update_route():
    event_id = request.view_args('event_id')
    body = request.get_json()
    event = {
        'deadline': body['deadline'],
        'details': body['details'],
        'details_link': body['details_link'],
        'event_name': body['event_name'],
        'location': body['location'],
        'start_date': body['start_date']
    }
    return json.dumps(event_update(event_id, event))


@app.delete('/event/delete/<event_id>')
@swag_from(event_delete_spec)
def event_delete_route():
    event_id = request.view_args('event_id')
    return json.dumps(event_delete(event_id))


@app.get('/profile/get')
@swag_from(profile_get_spec)
def profile_get_route():
    token = request.headers.get('Authorization')

    if token.startswith('Bearer '):
        token = token[len('Bearer '):]

    return json.dumps(get_profile_details(token))


@app.post('/profile/update/details')
@swag_from(profile_update_details_spec)
def profile_update_details_route():
    token = request.headers.get('Authorization')

    if token.startswith('Bearer '):
        token = token[len('Bearer '):]

    body = request.get_json()
    return json.dumps(update_profile_details(token, body['username'], body['description'], body['full_name'], body['job_title'], body['fun_fact'], body['preferences']))


@app.post('/profile/update/password')
@swag_from(profile_update_password_spec)
def profile_update_password_route():
    token = request.headers.get('Authorization')
    if token.startswith('Bearer '):
        token = token[len('Bearer '):]

    body = request.get_json()
    return json.dumps(update_profile_password(token, body['old_password'], body['new_password'], body['re_password']))


@app.get('/user/events')
@swag_from(user_events_spec)
def user_events_route():
    token = request.headers.get('Authorization')

    if token.startswith('Bearer '):
        token = token[len('Bearer '):]

    return json.dumps(user_events(token))


@app.post('/user/register/<event_id>')
@swag_from(user_register_event_spec)
def user_register_event_route():
    token = request.headers.get('Authorization')

    if token.startswith('Bearer '):
        token = token[len('Bearer '):]

    event_id = request.view_args('event_id')

    return json.dumps(user_register_event(token, event_id))


if __name__ == '__main__':
    app.run(port=config['BACKEND_PORT'], debug=True)
