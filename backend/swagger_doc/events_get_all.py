from backend.swagger_doc.definitions_auth import definitions_auth

events_get_all_spec = {
    'tags': ['Events'],
    'parameters': [],
    'definitions': definitions_auth,
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