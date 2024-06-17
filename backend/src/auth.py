from backend.src.error import AccessError, InputError

class AuthModule:
    def __init__(self, db):
        self.db = db
        self.user_id = 0

    def login(self, email, password):
        match = self.db.search_user('email', email)
        if match is None:
            raise InputError("Incorrect email or password")
        return {
            'token': f'{match}'
        }

    def register(self, username, email, password):
        if self.db.search_user('email', email) is not None:
            raise InputError("Email is already being used")
        user_id = self.user_id
        self.user_id += 1
        self.db.insert_user(user_id, {
            'username': username,
            'email': email,
            'password': password
        })
        return {
            'token': f'{user_id}'
        }

    def logout(self, token):
        return {}