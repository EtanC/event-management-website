class FakeDatabase:
    def __init__(self):
        self.db = {
            'users': {},
            'events': {}
        }
    def insert_user(self, user_id, user):
        self.db['users'][f'{user_id}'] = user
    def get_user(self, email, password):
        return list(filter(lambda x: x['email'] == email and x['password'] == password, self.db['users']))
    
    def search_user(self, key, value):
        matches = list(filter(lambda x: x[1][key] == value, self.db['users'].items()))
        if (len(matches) == 0):
            return None
        return matches[0][0]