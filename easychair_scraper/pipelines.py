from pymongo import MongoClient
from scrapy.exceptions import DropItem
import logging
# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
from backend.src.database import db
from backend.src.config import config
from easychair_scraper.ranking import Ranking, NameProcessor
import random

class EasychairScraperPipeline(object):

    def __init__(self):
        self.ranker = Ranking(NameProcessor())
        self.ranker.icore_to_ranking_map('./easychair_scraper/ranking_data/CORE.csv')

    def process_item(self, item, spider):
        # If name is already in database, then event is already inserted/found
        # TODO:
        # - Case sensitivity
        # - Instead of dropping item, update event details, maybe they changed
        if self.db.events.find_one({"name": item.get("name")}) is not None:
            logging.debug("Duplicate item found: {0}".format(item.get("name")), extra={'spider': spider})
            raise DropItem("Duplicate item found: {0}".format(item.get("name")))
        item['ranking'] = self.ranker.rank_event(item['name'])
        item['crawled'] = True
        item['creator'] = ''
        item['authorized_users'] = []
        self.db.events.insert_one(dict(item))
        logging.debug("Event added to MongoDB database!", extra={'spider': spider})
        
        return item
    
    def open_spider(self, spider):
        self.db = spider.db

class RemoveInvalidPipeline(object):
    def process_item(self, item, spider):
        for data in item:
            if not data:
                raise DropItem("Missing {0}!".format(data))
        return item

class RandomImagePipeline(object):
    def __init__(self):
        self.max = config['RANDOM_IMAGES_END_INDEX']
        self.min = config['RANDOM_IMAGES_START_INDEX']
    def process_item(self, item, spider):
        item['image'] = random.randint(self.min, self.max)
        return item