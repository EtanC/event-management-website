user_register_event_spec = {
    'tags': ['User'],
    'security': [
        {
            "bearerAuth": []
        }
    ],
    'parameters': [
        {
            'name': 'Event Id',
            'in': 'path',
            'type': 'string',
            'required': 'true'
        },
    ],
    'responses': {
        200: {
            'description': 'Successfully registered to event',
        },
        400: {
            'description': 'Already registered to event'
        },
        403: {
            'description': 'Invalid token OR Expired token OR Invalid user'
        }
    }
}
user_unregister_event_spec = {
    'tags': ['User'],
    'security': [
        {
            "bearerAuth": []
        }
    ],
    'parameters': [
        {
            'name': 'Event Id',
            'in': 'path',
            'type': 'string',
            'required': 'true'
        },
    ],
    'responses': {
        200: {
            'description': 'Successfully unregistered event',
        },
        400: {
            'description': 'Not registered to event'
        },
        403: {
            'description': 'Invalid token OR Expired token OR Invalid user'
        }
    }
}
user_events_spec = {
    'tags': ['User'],
    'security': [
        {
            "bearerAuth": []
        }
    ],
    'parameters': [],
    'responses': {
        200: {
            'description': 'Successfully retrieved user events',
            'schema': {
                'type': 'object',
                'properties': {
                    'events': {
                        'type': 'array',
                        'items': {
                            '$ref': '#definitions/event',
                        },
                    }
                }
            },
        },
        403: {
            'description': 'Invalid token OR Expired token OR Invalid user'
        }
    }
}