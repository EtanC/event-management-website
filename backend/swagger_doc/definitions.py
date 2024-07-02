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
        'date': {
            'type': 'string'
        },
        'event_id': {
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
            "bearerFormat": "JWT"
        }
    }
}