from backend.swagger_doc.definitions_profile import definitions_profile

profile_get_spec = {
    'parameters': [
        {
            '$ref': '#/definitions/parameters/token'
        },
    ],
    'definitions': definitions_profile,
    'responses': {
        200: {
            'description': 'Success',
            'schema': {
                'type': 'object',
                'properties': {
                    'username': {
                        '$ref': '#/definitions/data/username'
                    },
                    'email': {
                        '$ref': '#/definitions/data/email'
                    },
                    'preferences': {
                        '$ref': '#/definitions/data/preferences'
                    }
                }
            },
        },
        403: {
            'description': 'Invalid Token'
        }
    }
}
