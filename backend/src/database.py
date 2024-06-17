from pymongo import MongoClient

class Database:
    def __init__(self, table):
        client = MongoClient("mongodb+srv://Braian:LCFJJxvpu80LxtU3@comp3900-database.dkmw7l9.mongodb.net/?retryWrites=true&w=majority&appName=COMP3900-Database")
        self.db = client.test_database
        self.table = table
    def insert_one(self, object):
        self.db[self.table].insert_one(object)
    def find_one(self, filter):
        self.db[self.table].find_one(filter)