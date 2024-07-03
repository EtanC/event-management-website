events_clear_spec = {
    'tags': ['Events'],
    'parameters': [],
    'responses': {
        200: {
            'description': 'Successfully deleted all events',
        },
        500: {
            'description': 'Error deleting events',
        }
    }
}

events_crawl_spec = {
    'tags': ['Events'],
    'parameters': [],
    'responses': {
        200: {
            'description': 'Data crawled successfully',
        },
    }
}

events_get_all_spec = {
    'tags': ['Events'],
    'parameters': [],
    'responses': {
        200: {
            'description': 'Retrieved events',
            'schema': {
                'type': 'object',
                'properties': {
                    'events': {
                        'type': 'array',
                        'items': {
                            '$ref': '#definitions/event'
                        }
                    }
                }
            },
        },
    }
}

event_create_spec = {
    'tags': ['Events'],
    'parameters': [
        {
            'name': 'Body',
            'in': 'body',
            'type': 'object',
            'required': 'true',
            'properties': {
                'name': {
                    '$ref': '#/definitions/name'
                },
                'location': {
                    '$ref': '#/definitions/event_location'
                },
                'start_date': {
                    '$ref': '#/definitions/event_start_date'
                },
                'end_date': {
                    '$ref': '#/definitions/event_end_date'
                },
                'tags': {
                    '$ref': '#/definitions/event_tags'
                },
                'description': {
                    '$ref': '#/definitions/event_description'
                },
                'registration_link': {
                    '$ref': '#/definitions/event_registration_link'
                },
                'image': {
                    '$ref': '#/definitions/event_image'
                },
            }
        }
    ],
    'responses': {
        200: {
            'description': 'Successfully created event',
            'schema': {
                'type': 'object',
                'properties': {
                    'event_id': {
                        '$ref': '#/definitions/event_id'
                    }
                }
            },
        },
        400: {
            'description': 'Event already exists OR Invalid event given'
        }
    }
}

event_update_spec = {
    'tags': ['Events'],
    'parameters': [
        {
            'name': 'Event Id',
            'in': 'path',
            'type': 'string',
            'required': 'true'
        },
        {
            'name': 'Body',
            'in': 'body',
            'type': 'object',
            'required': 'true',
            'properties': {
                'name': {
                    '$ref': '#/definitions/name'
                },
                'location': {
                    '$ref': '#/definitions/event_location'
                },
                'start_date': {
                    '$ref': '#/definitions/event_start_date'
                },
                'deadline': {
                    '$ref': '#/definitions/event_deadline'
                },
                'details': {
                    '$ref': '#/definitions/event_details'
                },
                'details_link': {
                    '$ref': '#/definitions/event_details_link'
                },
            }
        }
    ],
    'responses': {
        200: {
            'description': 'Successfully updated event',
        },
        400: {
            'description': 'No event matches event_id OR Invalid updated event given'
        }
    }
}


event_delete_spec = {
    'tags': ['Events'],
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
            'description': 'Successfully deleted event',
        },
        400: {
            'description': 'No event matches event_id'
        }
    }
}
