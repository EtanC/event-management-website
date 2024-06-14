from flask import Flask
from flasgger import Swagger, swag_from
from backend.swagger_doc.auth_register import auth_register_spec
from backend.swagger_doc.auth_login import auth_login_spec
from backend.swagger_doc.auth_logout import auth_logout_spec
import json

app = Flask(__name__)
swagger = Swagger(app)

def getConfig():
    with open('./backend/src/config.json') as file:
        config = json.load(file)
    return config

config = getConfig()

@app.post('/auth/register')
@swag_from(auth_register_spec)
def auth_register():
    return json.dumps({})

@app.post('/auth/login')
@swag_from(auth_login_spec)
def auth_login():
    return json.dumps({})

@app.post('/auth/logout')
@swag_from(auth_logout_spec)
def auth_logout():
    return json.dumps({})


if __name__ == '__main__':
    app.run(port=config['BACKEND_PORT'],debug=True)