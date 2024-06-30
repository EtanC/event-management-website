from backend.swagger_doc.definitions_event import definitions_event

events_crawl_spec = {
    'tags': ['Events'],
    'parameters': [],
    'definitions': definitions_event,
    'responses': {
        200: {
            'description': 'Data crawled successfully',
        },
        500: {
            'description': 'Error crawling data',
        }
    }
}