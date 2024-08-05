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

user_toggle_notifications_spec = {
    'tags': ['User'],
    'security': [
        {
            "bearerAuth": []
        }
    ],
    'parameters': [],
    'responses': {
        200: {
            'description': 'Successfully toggled notifications',
        },
        403: {
            'description': 'Invalid token OR Expired token OR Invalid user'
        }
    }
}

user_get_all_spec = {
    'tags': ['User'],
    'security': [
        {
            "bearerAuth": []
        }
    ],
    'parameters': [],
    'responses': {
        200: {
            'description': 'Successfully retrieved users',
            'schema': {
                'type': 'object',
                'properties': {
                    'users': {
                        'type': 'array',
                        'items': {
                            'type': 'string'
                        }
                    }
                }
            }
        },
        403: {
            'description': 'Invalid token OR Expired token OR Invalid user'
        }
    }
}

user_delete_spec = {
    'tags': ['User'],
    'security': [
        {
            "bearerAuth": []
        }
    ],
    'parameters': [
        {
            'name': 'Body',
            'in': 'body',
            'type': 'object',
            'required': 'true',
            'properties': {
                'user_id': {
                    '$ref': '#definitions/user_id',
                }
            }
        }
    ],
    'responses': {
        200: {
            'description': 'Successfully deleted user',
        },
        403: {
            'description': 'User is not an admin OR Invalid token OR Expired token OR Invalid user'
        },
        500: {
            'description': 'Failed to delete user'
        }
    }
}