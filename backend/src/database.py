from pymongo import MongoClient
import gridfs

from backend.src.config import config
# install pymongo
# python3 -m pip install "pymongo[srv]"

# to run: python3 -m backend.src.database
client = MongoClient('mongodb+srv://comp3900:wowilovecompsci123@comp3900-database.dkmw7l9.mongodb.net/?retryWrites=true&w=majority&appName=COMP3900-Database')
class Database:
    def __init__(self, test):
        self.client = client
        if test == True:
            self.db = self.client[config['TESTDB_NAME']]
        else:
            self.db = self.client[config['DATABASE_NAME']]
        self.test = test
        self.gridfs = gridfs.GridFS(self.db)
        self.changed_db = False

    def __getitem__(self, key):
        return self.db[key]

    def __getattr__(self, key):
        return self.db[key]
    
    def set_test_db(self):
        self.db = self.client[config['TESTDB_NAME']]
        self.changed_db = True
    
    def set_real_db(self):
        self.db = self.client[config['DATABASE_NAME']]
        self.changed_db = True

    def fs(self):
        if self.changed_db:
            self.gridfs = gridfs.GridFS(self.db)
            self.changed_db = False
        return self.gridfs
    def clear_all(self):
        self.client.drop_database(config['TESTDB_NAME'] if self.test else config['DATABASE_NAME'])

global db
db = Database(False)

def clear(collection):
    db[collection].delete_many({})