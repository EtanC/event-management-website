import sys
from backend.src.database import clear, db
import subprocess
import requests
import os
from dotenv import load_dotenv

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

def events_ai_description():
  load_dotenv()
  AI_TOKEN = os.getenv("AI_TOKEN")
  # loop through each event listing 
  cursor = db.events.find()
  # ai API
  API_URL = "https://api-inference.huggingface.co/models/pszemraj/led-large-book-summary"
  headers = {"Authorization": f"Bearer {AI_TOKEN}"}
  for event in cursor:
    ai_description = event.get("ai_description")
    if ai_description is None or (ai_description and 'error' in ai_description):
      query_filter = {"_id": event["_id"]}
      output = query({
          "inputs": event.get("details"),
          "options": {"wait_for_model": True}
        }, API_URL, headers)
      db.events.update_one(query_filter, {"$set": {"ai_description": output}})
  return {}

def query(payload, url, headers):
    response = requests.post(url, headers=headers, json=payload)
    return response.json()