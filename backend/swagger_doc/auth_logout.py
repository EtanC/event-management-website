from backend.swagger_doc.definitions_auth import definitions_auth

auth_logout_spec = {
    'parameters': [
        {
            '$ref': '#/definitions/parameters/token'
        },
    ],
    'definitions': definitions_auth,
    'responses': {
        200: {
            'description': 'Successfully invalidated the provided token',
            'schema': {
                'type': 'object',
                'properties': {
                }
            },
        }
    }
}