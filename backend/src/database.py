from pymongo import MongoClient
from backend.src.config import config
# install pymongo
# python3 -m pip install "pymongo[srv]"

# to run: python3 -m backend.src.database

class Database:
    def __init__(self, test):
        self.client = MongoClient('mongodb+srv://comp3900:wowilovecompsci123@comp3900-database.dkmw7l9.mongodb.net/?retryWrites=true&w=majority&appName=COMP3900-Database')
        if test == True:
            self.db = self.client[config['TESTDB_NAME']]
        else:
            self.db = self.client[config['DATABASE_NAME']]

    def __getitem__(self, key):
        return self.db[key]
    
    def set_test_db(self):
        self.db = self.client[config['TESTDB_NAME']]
    
    def set_real_db(self):
        self.db = self.client[config['DATABASE_NAME']]

global db
db = Database(False)

def clear(collection):
    db[collection].delete_many({})