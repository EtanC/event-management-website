from pymongo import MongoClient
from scrapy.exceptions import DropItem
import logging
# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter


class EasychairScraperPipeline(object):

    def __init__(self):
        client = MongoClient('mongodb+srv://comp3900:wowilovecompsci123@comp3900-database.dkmw7l9.mongodb.net/?retryWrites=true&w=majority&appName=COMP3900-Database')
        db = client.test_database
        self.db = db

    def process_item(self, item, spider):
        valid = True
        for data in item:
            if not data:
                valid = False
                raise DropItem("Missing {0}!".format(data))
        if valid:
            if self.db.events.find_one({"name": item.get("name")}) is None:
                self.db.events.insert_one(dict(item))
                logging.debug("Event added to MongoDB database!", extra={'spider': spider})
            else:
                logging.debug("Duplicate item found: {0}".format(item.get("name")), extra={'spider': spider})
                raise DropItem("Duplicate item found: {0}".format(item.get("name")))
        return item
