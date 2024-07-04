from backend.swagger_doc.definitions_profile import definitions_profile

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

profile_update_details_spec = {
    'parameters': [
        {
            '$ref': '#/definitions/parameters/update_details'
        },
    ],
    'definitions': definitions_profile,
    'responses': {
        200: {
            'description': 'Successful Details Change',
            'schema': {
                'type': 'object',
                'properties': {
                    'description': {
                        '$ref': '#/definitions/data/description'
                    },
                    'job_title': {
                        '$ref': '#/definitions/data/job_title'
                    },
                    'fun_fact': {
                        '$ref': '#/definitions/data/fun_fact'
                    },
                    'full_name': {
                        '$ref': '#/definitions/data/full_name'
                    },
                }
            },
        },
        403: {
            'description': 'Invalid Token'
        },
        400: {
            'description': 'Error in updating new details'
        }
    }
}

profile_update_password_spec = {
    'parameters': [
        {
            '$ref': '#/definitions/parameters/update_password'
        },
    ],
    'definitions': definitions_profile,
    'responses': {
        200: {
            'description': 'Successful Password Change',
            'schema': {
                'type': 'object',
                'properties': {
                    'old_password': {
                        '$ref': '#/definitions/data/password',
                    },
                    'new_password': {
                        '$ref': '#/definitions/data/password',
                    },
                    're_password': {
                        '$ref': '#/definitions/data/password',
                    },
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
