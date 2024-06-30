definitions_event = {
    'data': {
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
        'event_details': {
            'type': 'string'
        },
        'event_deadline': {
            '$ref': '#definitions/data/date'
        },
        'event_details_link': {
            'type': 'string'
        },
        'event_start_date': {
            '$ref': '#definitions/data/date'
        },
        'date': {
            'type': 'string'
        }
    },
}