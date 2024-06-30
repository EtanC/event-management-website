from backend.swagger_doc.definitions_event import definitions_event

events_get_all_spec = {
    'tags': ['Events'],
    'parameters': [],
    'definitions': definitions_event,
    'responses': {
        200: {
            'description': 'Retrieved events',
            'schema': {
                'type': 'object',
                'properties': {
                    'events': {
                        'type': 'array',
                        'items': {
                            '$ref': '#definitions/data/event'
                        }
                    }
                }
            },
        },
        500: {
            'description': 'Error retrieving events',
        }
    }
}