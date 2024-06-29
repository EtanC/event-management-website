from backend.swagger_doc.definitions_auth import definitions_auth

events_clear_spec = {
    'tags': ['Events'],
    'parameters': [],
    'definitions': definitions_auth,
    'responses': {
        200: {
            'description': 'Successfully deleted all events',
        },
        500: {
            'description': 'Error deleting events',
        }
    }
}