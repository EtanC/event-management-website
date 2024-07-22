from swagger_doc.definitions_profile import definitions_profile

profile_get_spec = {
    'tags': ['Profile'],
    'security': [
        {
            "bearerAuth": []
        }
    ],
    'responses': {
        200: {
            'description': 'Success',
            'schema': {
                'type': 'object',
                'properties': {
                    'username': {
                        '$ref': '#/definitions/username'
                    },
                    'email': {
                        '$ref': '#/definitions/email'
                    },
                    'description': {
                        '$ref': '#/definitions/description'
                    },
                    'full_name': {
                        '$ref': '#/definitions/full_name'
                    },
                    'job_title': {
                        '$ref': '#/definitions/job_title'
                    },
                    'fun_fact': {
                        '$ref': '#/definitions/fun_fact'
                    },
                    'profile_pic': {
                        '$ref': '#/definitions/profile_pic'
                    }
                }
            },
        },
        403: {
            'description': 'Invalid Token'
        }
    }
}

profile_update_details_spec = {
    'tags': ['Profile'],
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
                'email': {
                    '$ref': '#/definitions/email',
                },
                'full_name': {
                    '$ref': '#/definitions/full_name',
                },
                'description': {
                    '$ref': '#/definitions/desciption',
                },
                'fun_fact': {
                    '$ref': '#/definitions/fun_fact',
                },
                'job_title': {
                    '$ref': '#/definitions/job_title',
                },
                'profile_pic': {
                    '$ref': '#/definitions/profile_pic',
                }
            }
        },
        {
            'name': 'Files',
            'in': 'formData',
            'type': 'file',
            'required': 'true',
            'properties': {
                'profile_pic': {
                    'type': 'string',
                    'format': 'binary'
                }
            }
        }
    ],
    'responses': {
        200: {
            'description': 'Successful Details Change',
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
            'description': 'Error in updating new details'
        }
    }
}

profile_update_password_spec = {
    'tags': ['Profile'],
    'security': [
        {
            "bearerAuth": []
        }
    ],
    'parameters': [
        {
            '$ref': '#/definitions/parameters/update_password'
        },
    ],
    'responses': {
        200: {
            'description': 'Successful Password Change',
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