from backend.src.database import clear, db
import subprocess

def events_crawl():
    subprocess.run(["cd backend/easychair_scraper && python3 -m scrapy crawl easychair"], shell=True)
    subprocess.run(["cd backend/easychair_scraper && python3 -m scrapy crawl wikicfp"], shell=True)
    return {}

def stringify_id(x):
    x.update({ '_id': str(x['_id'])})
    return x

def events_get_all():
    return list(map(stringify_id , db.events.find({})))

def events_clear():
    clear('events')
    return {}

def event_create(event):
    return {
        'event_id': 'theeventid'
    }

def event_update(event_id, new_event):
    return {}

def event_delete(event_id):
    return {}