definitions_profile = {
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
        'preferences': {
            'type': 'dict'
        }
    },
    'parameters': {
        'update_details': {
            'name': 'Update Details',
            'in': 'body',
            'type': 'object',
            'required': 'true',
            'properties': {
                'email': {
                    '$ref': '#/definitions/data/email',
                },
                'username': {
                    '$ref': '#/definitions/data/username',
                },
                'old_password': {
                    '$ref': '#/definitions/data/password',
                },
                'new_password': {
                    '$ref': '#/definitions/data/password',
                },
                're_password': {
                    '$ref': '#/definitions/data/password',
                },
                'preferences': {
                    '$ref': '#/definitions/data/preferences',
                }
            }
        },
        'token': {
            'name': 'token',
            'in': 'header',
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