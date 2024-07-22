import requests
from test_src.util import parse_response, backend_url

def clear_all():
    response = requests.delete(f'{backend_url}/clear')
    return parse_response(response)