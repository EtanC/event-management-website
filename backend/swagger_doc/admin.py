admin_invite_spec = {
    'tags': ['Admin'],
    'security': [
        {
            "bearerAuth": []
        }
    ],
    'parameters': [
        {
            'name': 'Body',
            'in': 'body',
            'type': 'object',
            'required': 'true',
            'properties': {
                'username': {
                    '$ref': '#/definitions/username',
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
                }
            },
        },
        400: {
            'description': 'Username doesn\'t exist'
        }
    }
}

admin_remove_spec = {
    'tags': ['Admin'],
    'security': [
        {
            "bearerAuth": []
        }
    ],
    'parameters': [
        {
            'name': 'Body',
            'in': 'body',
            'type': 'object',
            'required': 'true',
            'properties': {
                'username': {
                    '$ref': '#/definitions/username',
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
                }
            },
        },
        400: {
            'description': 'Username doesn\'t exist'
        }
    }
}

