from backend.swagger_doc.definitions_profile import definitions_profile

profile_update_spec = {
    'parameters': [
        {
            '$ref': '#/definitions/parameters/update_details'
        },
    ],
    'definitions': definitions_profile,
    'responses': {
        200: {
            'description': 'Successful Change',
            'schema': {
                'type': 'object',
                'properties': {
                }
            },
        },
        403: {
            'description': 'Invalid Token'
        },
        400: {
          'description': 'Incorrect old password or passwords don\'t match'
        }
    }
}