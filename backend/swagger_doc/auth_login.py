from backend.swagger_doc.definitions_auth import definitions_auth

auth_login_spec = {
    'tags': ['Auth'],
    'parameters': [
        {
            '$ref': '#/definitions/parameters/login_details'
        },
    ],
    'definitions': definitions_auth,
    'responses': {
        200: {
            'description': 'Successful login',
            'schema': {
                'type': 'object',
                'properties': {
                    'token': {
                        '$ref': '#/definitions/data/token'
                    }
                }
            },
        },
        400: {
            'description': 'Wrong email or password'
        }
    }
}