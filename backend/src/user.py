from backend.src.database import db
from bson import ObjectId
import jwt
from backend.src.config import config
from backend.src.error import AccessError, InputError
from bson import ObjectId
from backend.src.events import stringify_id
from backend.src.auth import decode_token
from email.message import EmailMessage
import ssl
from smtplib import SMTP_SSL, SMTPRecipientsRefused 

def user_exists(user_id):
    return db.users.find_one({ '_id': ObjectId(user_id) }) is not None

def user_register_event(token, event_id):
    user_id = decode_token(token)
    result = db.users.update_one(
        { '_id': ObjectId(user_id) },
        {
            '$addToSet': {
                'registered_events': event_id,
            }
        }
    )
    if result.modified_count == 0:
        raise InputError('Already registered to event')
    else:
        # call notification email
        subject = "You've just registered to an event!"

        event = db.events.find_one({ "_id": ObjectId(event_id) })

        user = db.users.find_one({ '_id': ObjectId(user_id) })

        body = f"""
You've just registered to an event: {event['name']} at {event['start_date']} in {event['location']} 
"""
        send_email(subject, body, user['email'])
    return {}



def user_events(token):
    # Get the user document
    user_id = decode_token(token)
    user = db.users.find_one({ '_id': ObjectId(user_id) })
    # 1. Get user's list of "registered_events" event_ids
    # 2. Search for events in events collection that match these ids
    events = list(map(stringify_id, db.events.find({ '_id': { '$in': list(map(ObjectId, user['registered_events'])) }})))
    return {
        'events': events,
    }

def send_email(subject, body, receiver):
    em = EmailMessage()
    em['From'] = config['APP_EMAIL']
    em['To'] = receiver
    em['Subject'] = subject
    em.set_content(body)

    context = ssl.create_default_context()

    with SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
        smtp.login(config['APP_EMAIL'], config['APP_PASSWORD'])
        try:
            smtp.sendmail(config['APP_EMAIL'], receiver, em.as_string())
        except SMTPRecipientsRefused:
            raise InputError('User email is not valid')
        # if SSL error, go to python folder on ur computer and double click Install Certificates.command

def check_notifications():
    # check all events that every user is registered in, and send a reminder at 7 days before, 3 days before, 1 day before
    # lmk if thats too many reminders



    pass


if __name__ == '__main__':
    send_email('test subject', 'test body', 'kchen397@gmail.com')

    send_email('test subject', 'test body', 'aiygwduaigwydagwdia@gmail.com')