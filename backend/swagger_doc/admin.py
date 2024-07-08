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
            'description': 'Provided username doesn\'t exist'
        },
        403: {
            'description': 'User is not an admin'
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
            'description': 'Successful Removal',
            'schema': {
                'type': 'object',
                'properties': {
                }
            },
        },
        400: {
            'description': 'Provided username doesn\'t exist'
        },
        403: {
            'description': 'User is not an admin'
        }
    }
}


is_admin_spec = {
    'tags': ['Admin'],
    'security': [
        {
            "bearerAuth": []
        }
    ],
    'parameters': [],
    'responses': {
        200: {
            'description': 'Success',
            'schema': {
                'type': 'object',
                'properties': {
                    'is_admin': '#/definitions/is_admin'
                }
            },
        },
        400: {
            'description': 'Provided username doesn\'t exist'
        },
        403: {
            'description': 'User is not an admin'
        }
    }
}