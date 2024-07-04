import json

def getConfig():
    with open('../src/config.json') as file:
        config = json.load(file)
    return config

config = getConfig()