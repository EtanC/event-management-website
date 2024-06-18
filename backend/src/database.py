from pymongo import MongoClient

client = MongoClient("mongodb+srv://Braian:LCFJJxvpu80LxtU3@comp3900-database.dkmw7l9.mongodb.net/?retryWrites=true&w=majority&appName=COMP3900-Database")
db = client.test_database

def clear(collection):
    db.drop_collection(collection)