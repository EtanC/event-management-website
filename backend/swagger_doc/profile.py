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
            'name': 'Body',
            'in': 'body',
            'type': 'object',
            'required': 'true',
            'properties': {
                'email': {
                    '$ref': '#/definitions/email',
                },
                'full_name': {
                    '$ref': '#/definitions/full_name',
                },
                'description': {
                    '$ref': '#/definitions/desciption',
                },
                'fun_fact': {
                    '$ref': '#/definitions/fun_fact',
                },
                'job_title': {
                    '$ref': '#/definitions/job_title',
                },
                'profile_pic': {
                    '$ref': '#/definitions/profile_pic',
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

profile_update_preferences_spec = {
    'parameters': [
        {
            '$ref': '#/definitions/parameters/update_preferences'
        },
    ],
    'definitions': definitions_profile,
    'responses': {
        200: {
            'description': 'Successful Preferences Change',
            'schema': {
                'type': 'object',
                'properties': {
                    'new_preferences': {
                        '$ref': '#/definitions/data/new_preferences',
                    }
                }
            },
        },
        403: {
            'description': 'Invalid Token'
        },
        400: {
            'description': "Invalid preferences input"
        }
    }
}