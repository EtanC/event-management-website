auth_login_spec = {
    'tags': ['Auth'],
    'parameters': [
        {
            'name': 'Body',
            'in': 'body',
            'type': 'object',
            'required': 'true',
            'properties': {
                'email': {
                    '$ref': '#/definitions/email',
                },
                'password': {
                    '$ref': '#/definitions/password',
                }
            }
        },
    ],
    'responses': {
        200: {
            'description': 'Successful login',
            'schema': {
                'type': 'object',
                'properties': {
                    'token': {
                        '$ref': '#/definitions/token'
                    }
                }
            },
        },
        400: {
            'description': 'Wrong email or password'
        }
    }
}

auth_logout_spec = {
    'tags': ['Auth'],
    'parameters': [
        {
            'name': 'Body',
            'in': 'body',
            'type': 'object',
            'required': 'true',
            'properties': {
                'token': {
                    '$ref': '#/definitions/token',
                },
            }
        },
    ],
    'responses': {
        200: {
            'description': 'Successfully invalidated the provided token',
            'schema': {
                'type': 'object',
                'properties': {
                }
            },
        }
    }
}

auth_register_spec = {
    'tags': ['Auth'],
    'parameters': [
        {
            'name': 'Body',
            'in': 'body',
            'type': 'object',
            'required': 'true',
            'properties': {
                'username': {
                    '$ref': '#/definitions/email',
                },
                'email': {
                    '$ref': '#/definitions/email',
                },
                'password': {
                    '$ref': '#/definitions/password',
                }
            }
        },
    ],
    'responses': {
        200: {
            'description': 'Successfully registered with the provided details',
            'schema': {
                'type': 'object',
                'properties': {
                    'token': {
                        '$ref': '#/definitions/token'
                    }
                }
            },
        },
        400: {
            'description': 'Email already in use',
        }
    }
}