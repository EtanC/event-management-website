class AuthModule:
    def __init__(self, db):
        self.db = db

    def login(self, username, password):
        return {
            'token': '1'
        }

    def register(self, username, password):
        return {
            'token': '1'
        }

    def logout(self, token):
        return {}