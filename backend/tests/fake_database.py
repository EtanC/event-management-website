class FakeDatabase:
    def __init__(self):
        self.db = {
            'users': {},
            'events': {}
        }
    def insert_user(self, user_id, username, password):
        self.db['users'][f'{user_id}'] = {
            'username': username,
            'password': password
        }