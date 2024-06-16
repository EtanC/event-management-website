definitions_auth = {
    'data': {
        'username': {
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
                'username': {
                    '$ref': '#/definitions/data/username',
                },
                'password': {
                    '$ref': '#/definitions/data/password',
                }
            }
        },
        'token': {
            'name': 'token',
            'in': 'body',
            'type': 'string',
            'required': 'true',
        },
    }
}