profile_get_spec = {
    'tags': ['Profile'],
    'security': [
        {
            "bearerAuth": []
        }
    ],
    'responses': {
        200: {
            'description': 'Success',
            'schema': {
                'type': 'object',
                'properties': {
                    'username': {
                        '$ref': '#/definitions/username'
                    },
                    'email': {
                        '$ref': '#/definitions/email'
                    },
                    'preferences': {
                        '$ref': '#/definitions/preferences'
                    }
                }
            },
        },
        403: {
            'description': 'Invalid Token'
        }
    }
}

profile_update_spec = {
    'tags': ['Profile'],
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
                'username': {
                    '$ref': '#/definitions/username',
                },
                'old_password': {
                    '$ref': '#/definitions/password',
                },
                'new_password': {
                    '$ref': '#/definitions/password',
                },
                're_password': {
                    '$ref': '#/definitions/password',
                },
                'preferences': {
                    '$ref': '#/definitions/preferences',
                }
            }
        },
        {
            'name': 'Files',
            'in': 'formData',
            'type': 'file',
            'required': 'true',
            'properties': {
                'profile_pic': {
                    'type': 'string',
                    'format': 'binary'
                }
            }
        }
    ],
    'responses': {
        200: {
            'description': 'Successful Change',
            'schema': {
                'type': 'object',
                'properties': {
                }
            },
        },
        403: {
            'description': 'Invalid Token'
        },
        400: {
          'description': 'Incorrect old password or passwords don\'t match'
        }
    }
}