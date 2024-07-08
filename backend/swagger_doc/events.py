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

events_get_page_spec = {
  'tags': ['Events'],
  'parameters': [
    {
      'name': 'page_number',
      'in': 'path',
      'type': 'string',
      'required': 'true'
    }
  ],
  'responses': {
        200: {
            'description': 'Successfully retrieved events',
        },
    }
}
event_update_spec = {
    'tags': ['Events'],
    'security': [
        {
            "bearerAuth": []
        }
    ],
    'parameters': [
        {
            'name': 'event_id',
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
    'security': [
        {
            "bearerAuth": []
        }
    ],
    'parameters': [
        {
            'name': 'event_id',
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

event_authorize_spec = {
    'tags': ['Events'],
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
                'event_id': {
                    '$ref': '#/definitions/event_id',
                },
                'user_id': {
                    '$ref': '#/definitions/user_id',
                }
            }
        }
    ],
    'responses': {
        200: {
            'description': 'Sucessfully authorized user to manage this event'
        },
        403: {
            'description': 'Invalid token or user is not creator'
        }
    }
}
events_ai_description_spec = {
    'tags': ['Events'],
    'parameters': [],
    'responses': {
        200: {
            'description': 'Successfully added ai descriptions',
        },
        500: {
            'description': 'Error',
        }
    }
}