from backend.swagger_doc.definitions_event import definitions_event

events_clear_spec = {
    'tags': ['Events'],
    'parameters': [],
    'definitions': definitions_event,
    'responses': {
        200: {
            'description': 'Successfully deleted all events',
        },
        500: {
            'description': 'Error deleting events',
        }
    }
}