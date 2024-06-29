from backend.swagger_doc.definitions_auth import definitions_auth

events_crawl_spec = {
    'tags': ['Events'],
    'parameters': [],
    'definitions': definitions_auth,
    'responses': {
        200: {
            'description': 'Data crawled successfully',
        },
        500: {
            'description': 'Error crawling data',
        }
    }
}