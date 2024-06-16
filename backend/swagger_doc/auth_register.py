from backend.swagger_doc.definitions_auth import definitions_auth

auth_register_spec = {
    'parameters': [
        {
            '$ref': '#/definitions/parameters/username'
        },
        {
            '$ref': '#/definitions/parameters/password'
        }
    ],
    'definitions': definitions_auth,
    'responses': {
        200: {
            'description': 'Successfully registered with the provided details',
            'schema': {
                'type': 'object',
                'properties': {
                    'token': {
                        '$ref': '#/definitions/data/token'
                    }
                }
            },
        }
    }
}