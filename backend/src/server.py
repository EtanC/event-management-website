from flask import Flask, request
from flasgger import Swagger, swag_from
from backend.swagger_doc.auth_register import auth_register_spec
from backend.swagger_doc.auth_login import auth_login_spec
from backend.swagger_doc.auth_logout import auth_logout_spec
from backend.swagger_doc.events_crawl import events_crawl_spec
from backend.swagger_doc.events_clear import events_clear_spec
from backend.swagger_doc.events_get_all import events_get_all_spec
from backend.src.error import AccessError, InputError
import json
from werkzeug.exceptions import HTTPException
from backend.src.auth import auth_login, auth_register, auth_logout
from backend.src.events import events_crawl, events_clear, events_get_all
from flask_cors import CORS
from backend.src.config import config

app = Flask(__name__)
cors = CORS(app)
swagger = Swagger(app)

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
    return json.dumps(auth_login(body['username'], body['password']))

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

if __name__ == '__main__':
    app.run(port=config['BACKEND_PORT'],debug=True)