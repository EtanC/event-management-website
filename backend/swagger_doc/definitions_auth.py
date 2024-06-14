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
        'username': {
            'name': 'username',
            'in': 'body',
            'type': 'string',
            'required': 'true',
        },
        'password': {
            'name': 'password',
            'in': 'body',
            'type': 'string',
            'required': 'true',
        },
        'token': {
            'name': 'token',
            'in': 'body',
            'type': 'string',
            'required': 'true',
        },
    }
}