from pymongo import MongoClient

# install pymongo
# python3 -m pip install "pymongo[srv]"

# to run: python3 -m backend.src.database

client = MongoClient('mongodb+srv://comp3900:wowilovecompsci123@comp3900-database.dkmw7l9.mongodb.net/?retryWrites=true&w=majority&appName=COMP3900-Database')
db = client.test_database

def add_user(username, password):
    db.users.insert_one({ 'username': username, 'password': password })

# client = MongoClient("mongodb+srv://Braian:LCFJJxvpu80LxtU3@comp3900-database.dkmw7l9.mongodb.net/?retryWrites=true&w=majority&appName=COMP3900-Database")
# db = client.test_database

def clear(collection):
    db[collection].delete_many({})


if __name__ == '__main__':
    add_user('testusr', 'testpwd')
