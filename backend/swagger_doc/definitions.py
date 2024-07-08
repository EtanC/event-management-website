definitions = {
    'definitions': {
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
        'user_id': {
            'type': 'string'
        },
        'event': {
            'type': 'object',
            'properties': {
                'name': {
                    '$ref': '#definitions/name'
                },
                'location': {
                    '$ref': '#definitions/event_location'
                },
                'start_date': {
                    '$ref': '#definitions/event_start_date'
                },
                'end_date': {
                    '$ref': '#definitions/event_end_date'
                },
                'tags': {
                    '$ref': '#definitions/event_tags'
                },
                'description': {
                    '$ref': '#definitions/event_description'
                },
                'registration_link': {
                    '$ref': '#definitions/event_registration_link'
                },
                'image': {
                    '$ref': '#/definitions/event_image'
                },
                'ranking': {
                    '$ref': '#definitions/event_rank'
                }
            }
        },
        'name': {
            'type': 'string'
        },
        'event_location': {
            'type': 'string'
        },
        'event_description': {
            'type': 'string'
        },
        'event_end_date': {
            '$ref': '#definitions/date'
        },
        'event_registration_link': {
            'type': 'string'
        },
        'event_start_date': {
            '$ref': '#definitions/date'
        },
        'event_rank': {
            'type': 'integer',
        },
        'date': {
            'type': 'string'
        },
        'event_tags': {
            'type': 'array'
        },
        'event_id': {
            'type': 'string'
        },
        'event_image': {
            'type': 'string'
        },
        'preferences': {
            'type': 'dict'
        },
    },
    "securityDefinitions": {
        "bearerAuth": {
            "type": "apiKey",
            "scheme": "bearer",
            'in': 'header',
            "bearerFormat": "JWT",
            'name': 'Authorization',
        }
    }
}
