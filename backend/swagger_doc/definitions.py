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
                'details': {
                    '$ref': '#definitions/event_details'
                },
                'deadline': {
                    '$ref': '#definitions/event_deadline'
                },
                'details_link': {
                    '$ref': '#definitions/event_details_link'
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
        'event_details': {
            'type': 'string'
        },
        'event_deadline': {
            '$ref': '#definitions/date'
        },
        'event_details_link': {
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
        'event_id': {
            'type': 'string'
        },
        'profile_pic': {
            'type': 'object'
        },
        'is_admin': {
            'type': 'boolean'
        }
    },
    "securityDefinitions": {
        "bearerAuth": {
            "type": "apiKey",
            'in': 'cookie',
            'name': 'token',
        }
    }
}
