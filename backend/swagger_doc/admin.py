admin_invite_spec = {
    'tags': ['Admin'],
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
            'description': 'Successful Invite',
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