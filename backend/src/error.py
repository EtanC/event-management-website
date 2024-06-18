from werkzeug.exceptions import HTTPException

class AccessError(HTTPException):
    name = 'Access Error'
    code = 403
    def __init__(self, msg, *args):
        super().__init__(*args)
        self.description = msg
class InputError(HTTPException):
    name = 'InputError'
    code = 400
    def __init__(self, msg, *args):
        super().__init__(*args)
        self.description = msg
