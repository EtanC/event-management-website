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
            'description': 'Already registered to event OR Invalid user'
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

user_manage_events_spec = {
    'tags': ['User'],
    'security': [
        {
            "bearerAuth": []
        }
    ],
    'parameters': [],
    'responses': {
        200: {
            'description': 'Successfully retrieved events user is currently managing or events created by user (which they also manage)',
            'schema': {
                'type': 'object',
                'properties': {
                    'creator': {
                        'type': 'array',
                        'items': {
                            '$ref': '#definitions/event',
                        },
                    },
                    'manager': {
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