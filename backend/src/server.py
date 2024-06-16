from flask import Flask, request
from flasgger import Swagger, swag_from
from backend.swagger_doc.auth_register import auth_register_spec
from backend.swagger_doc.auth_login import auth_login_spec
from backend.swagger_doc.auth_logout import auth_logout_spec
from backend.src.auth import auth_login, auth_register, auth_logout
from backend.src.error import AccessError, InputError
import json
from werkzeug.exceptions import HTTPException

app = Flask(__name__)
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

def getConfig():
    with open('./backend/src/config.json') as file:
        config = json.load(file)
    return config

config = getConfig()

@app.post('/auth/register')
@swag_from(auth_register_spec)
def auth_register_route():
    body = request.get_json()
    return json.dumps(auth_register(body['username'], body['password']))

@app.post('/auth/login')
@swag_from(auth_login_spec)
def auth_login_route():
    body = request.get_json()
    return json.dumps(auth_login(body['username'], body['password']))

@app.post('/auth/logout')
@swag_from(auth_logout_spec)
def auth_logout_route():
    body = request.get_json()
    return json.dumps(auth_logout(body['token']))


if __name__ == '__main__':
    app.run(port=config['BACKEND_PORT'],debug=True)