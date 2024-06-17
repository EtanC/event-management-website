from backend.src.error import AccessError, InputError

class AuthModule:
    def __init__(self, db):
        self.db = db

    def login(self, email, password):
        match = self.db.find_one({ 'email': email, 'password': password })
        if match is None:
            raise InputError("Incorrect email or password")
        return {
            'token': f'{match['_id']}'
        }

    def register(self, username, email, password):
        if self.db.find_one({ 'email': email }) is not None:
            raise InputError("Email is already being used")
        user = self.db.insert_one({
            'username': username,
            'email': email,
            'password': password
        })
        return {
            'token': f'{user['_id']}'
        }

    def logout(self, token):
        return {}