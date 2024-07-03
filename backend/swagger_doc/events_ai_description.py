from backend.swagger_doc.definitions_auth import definitions_auth

events_ai_description_spec = {
    'tags': ['Events'],
    'parameters': [],
    'definitions': definitions_auth,
    'responses': {
        200: {
            'description': 'Successfully added ai descriptions',
        },
        500: {
            'description': 'Error',
        }
    }
}