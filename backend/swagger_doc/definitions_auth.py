definitions_auth = {
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
        'event': {
            'type': 'object',
            'properties': {
                'name': {
                    '$ref': '#definitions/data/event_name'
                },
                'location': {
                    '$ref': '#definitions/data/event_location'
                },
                'start_date': {
                    '$ref': '#definitions/data/event_start_date'
                },
                'details': {
                    '$ref': '#definitions/data/event_details'
                },
                'deadline': {
                    '$ref': '#definitions/data/event_deadline'
                },
                'details_link': {
                    '$ref': '#definitions/data/event_details_link'
                },
            }
        },
        'event_name': {
            'type': 'string'
        },
        'event_location': {
            'type': 'string'
        },
        'event_date': {
            '$ref': '#definitions/data/date'
        },
        'event_details': {
            'type': 'string'
        },
        'event_deadline': {
            '$ref': '#definitions/data/date'
        },
        'event_details_link': {
            'type': 'string'
        },
        'date': {
            'type': 'string'
        }
    },
    'parameters': {
        'login_details': {
            'name': 'Login Details',
            'in': 'body',
            'type': 'object',
            'required': 'true',
            'properties': {
                'email': {
                    '$ref': '#/definitions/data/email',
                },
                'password': {
                    '$ref': '#/definitions/data/password',
                }
            }
        },
        'register_details': {
            'name': 'Register Details',
            'in': 'body',
            'type': 'object',
            'required': 'true',
            'properties': {
                'username': {
                    '$ref': '#/definitions/data/email',
                },
                'email': {
                    '$ref': '#/definitions/data/email',
                },
                'password': {
                    '$ref': '#/definitions/data/password',
                }
            }
        },
        'token': {
            'name': 'JWT token',
            'in': 'body',
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