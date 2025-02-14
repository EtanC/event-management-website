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

events_get_tagged_spec = {
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
                'tags': {
                        'type': 'array',
                        'items': {
                            'type': 'object',
                            'properties': {
                                'tag': {
                                    'type': 'string'
                                }
                            }
                        }
                    }
            }
        }
    ],
    'responses': {
        200: {
            'description': 'Successfully retrieved users',
            'schema': {
                'type': 'object',
                'properties': {
                    'events': {
                        'type': 'array',
                        'items': {
                            'type': 'object',
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
                                'ranking': {
                                    '$ref': '#/definitions/event_rank'
                                }
                            }
                        }
                    }
                }
            }
        }
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

events_get_page_spec = {
    'tags': ['Events'],
    'parameters': [
        {
            'name': 'page_number',
            'in': 'path',
            'type': 'string',
            'required': True
        },
        {
          'name': 'name',
          'in': 'query',
          'type': 'string',
          'required': False
        },
        {
          'name': 'location',
          'in': 'query',
          'type': 'string',
          'required': False
        },
        {
          'name': 'date',
          'in': 'query',
          'type': 'string',
          'required': False
        }, 
        {
          'name': 'tags',
          'in': 'query',
          'type': 'array',
          'items': {
              'type': 'string'
          },
          'required': False
        },
        {
          'name': 'sort_by',
          'in': 'query',
          'type': 'string',
          'required': False,
          'enum': ['alphabetical', 'reverse', 'view_count']
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
                'email': {
                    '$ref': '#/definitions/email',
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

event_event_view_count_spec = {
    'tags': ['Events'],
    'parameters': [
        {
            'name': 'event_id',
            'in': 'path',
            'type': 'string',
            'required': True
        },
    ],
    'responses': {
        200: {
            'description': 'Successfully incremented view count',
        },
        400: {
            'description': 'Invalid event_id or error incrementing view count',
        }
    }
}