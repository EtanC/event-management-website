definitions_auth = {
    'data': {
        'username': {
            'type': 'string',
        },
        'email': {
            'type': 'string',
        },
        'password': {
            'type': 'string'
        },
        'token': {
            'type': 'string'
        },
    },
    'parameters': {
        'login_details': {
            'name': 'Login Details',
            'in': 'body',
            'type': 'object',
            'required': 'true',
            'properties': {
                'email': {
                    '$ref': '#/definitions/data/email',
                },
                'password': {
                    '$ref': '#/definitions/data/password',
                }
            }
        },
        'register_details': {
            'name': 'Register Details',
            'in': 'body',
            'type': 'object',
            'required': 'true',
            'properties': {
                'username': {
                    '$ref': '#/definitions/data/email',
                },
                'email': {
                    '$ref': '#/definitions/data/email',
                },
                'password': {
                    '$ref': '#/definitions/data/password',
                }
            }
        },
        'token': {
            'name': 'token',
            'in': 'body',
            'type': 'object',
            'required': 'true',
            'properties': {
                'token': {
                    '$ref': '#/definitions/data/token',
                },
            }
        },
    }
}