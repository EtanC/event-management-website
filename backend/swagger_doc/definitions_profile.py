definitions_profile = {
    'data': {
        'username': {
            'type': 'string',
        },
        'email': {
            'type': 'string',
        },
        'description': {
            'type': 'string'
        },
        'full_name': {
            'type': 'string'
        },
        'job_title': {
            'type': 'string'
        },
        'fun_fact': {
            'type': 'string'
        },
        'password': {
            'type': 'string'
        },
        'token': {
            'type': 'string'
        },
        'profile_pic': {
            'type': 'object'
        },
        'new_preferences': {
            'type': 'array',
            'items': {
                'type': 'string'
            }
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
                'description': {
                    '$ref': '#/definitions/data/description',
                },
                'full_name': {
                    '$ref': '#/definitions/data/full_name',
                },
                'job_title': {
                    '$ref': '#/definitions/data/job_title',
                },
                'fun_fact': {
                    '$ref': '#/definitions/data/fun_fact',
                },
                'profile_pic': {
                    '$ref': '#/definitions/data/profile_pic',
                },
            }
        },
        'update_password': {
            'name': 'Update Password',
            'in': 'body',
            'type': 'object',
            'required': 'true',
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
        'update_preferences': {
            'name': 'Update Preferences',
            'in': 'body',
            'type': 'object',
            'required': 'true',
            'properties': {
                'new_preferences': {
                    '$ref': '#/definitions/data/new_preferences',
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
