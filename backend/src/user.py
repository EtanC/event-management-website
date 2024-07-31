from backend.src.database import db
from bson import ObjectId
from backend.src.config import config
from backend.src.error import AccessError, InputError
from bson import ObjectId
from backend.src.events import stringify_id, is_admin
from backend.src.auth import decode_token
from email.message import EmailMessage
import ssl
from smtplib import SMTP_SSL, SMTPRecipientsRefused 
from datetime import datetime, timedelta
import os


def user_exists(user_id):
    return db.users.find_one({'_id': ObjectId(user_id)}) is not None


def event_exists(event_id):
    valid_id = ObjectId.is_valid(event_id)
    return valid_id and db.events.find_one({ '_id': ObjectId(event_id)}) is not None

def user_register_event(token, event_id):
    user_id = decode_token(token)
    if not event_exists(event_id):
        raise InputError('Invalid Event ID')
    result = db.users.update_one(
        {'_id': ObjectId(user_id)},
        {
            '$addToSet': {
                'registered_events': event_id,
            }
        }
    )
    if result.modified_count == 0:
        raise InputError('Already registered to event')
    else:
        user = get_user(user_id)
        if user['receive_notifications']:
            # call notification email
            subject = "You've just registered to an event!"

            event = db.events.find_one({ "_id": ObjectId(event_id) })

            user = db.users.find_one({ '_id': ObjectId(user_id) })

            body = f"""
    You've just registered to an event: {event['name']} at {event['start_date']} in {event['location']}. To see more go to {event['details_link']}.
    """
            send_email(subject, body, user['email'])
    return {}

def user_unregister_event(token, event_id):
    user_id = decode_token(token)
    result = db.users.update_one(
        { '_id': ObjectId(user_id) },
        {
            '$pull': {
                'registered_events': event_id,
            }
        }
    )
    if result.modified_count == 0:
        raise InputError('Not registered to event')
    return {}

# Convert a list of event_ids to event objects by finding the corresponding
# event in the database


def event_ids_to_events(event_ids):
    return list(map(stringify_id, db.events.find(
        {'_id':
            {
                '$in': list(map(ObjectId, event_ids))
            }
         }
    )))
def user_unregister_event(token, event_id):
    user_id = decode_token(token)
    result = db.users.update_one(
        { '_id': ObjectId(user_id) },
        {
            '$pull': {
                'registered_events': event_id,
            }
        }
    )
    if result.modified_count == 0:
        raise InputError('Not registered to event')
    return {}


def user_events(token):
    # Get the user document
    user_id = decode_token(token)
    user = db.users.find_one({'_id': ObjectId(user_id)})
    # 1. Get user's list of "registered_events" event_ids
    # 2. Search for events in events collection that match these ids
    events = event_ids_to_events(user['registered_events'])
    return {
        'events': events,
    }

def send_email(subject, body, receiver):
    em = EmailMessage()
    em['From'] = os.getenv('APP_EMAIL')
    em['To'] = receiver
    em['Subject'] = subject
    em.set_content(body)

    context = ssl.create_default_context()

    with SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
        smtp.login(os.getenv('APP_EMAIL'), os.getenv('APP_PASSWORD'))
        try:
            smtp.sendmail(os.getenv('APP_EMAIL'), receiver, em.as_string())
        except SMTPRecipientsRefused:
            raise InputError('User email is not valid')
        # if SSL error, go to python folder on ur computer and double click Install Certificates.command

def check_notifications():
    # check all events that every user is registered in, and send a reminder at 7 days before, 3 days before, 1 day before
    # lmk if thats too many reminders

    # idea for setting could be like only receive notifications for certain rankings
    for user in db.users.find():
        for event_id in user['registered_events']:
            event = db.events.find_one({'_id': ObjectId(event_id)})
            start_date_object = datetime.strptime(event['start_date'], "%d %B %Y")
            time_now = datetime.now()
            time_delta = start_date_object - time_now

            if time_delta.days >= 0 and user['receive_notifications']:
                # be careful cuz time_delta.days rounds down
                if time_delta.days <= 1 and event_id not in user['notifications_sent']['one_day']:
                    # send 1 day notif
                    subject = "Upcoming event in less than 1 day"

                    body = f"""
The event {event['name']} starts in less than 1 day! It's on {event['start_date']} at {event['location']}. To see more go to {event['details_link']}.
"""
                    send_email(subject, body, user['email'])

                    user['notifications_sent']['one_day'].append(event_id)

                elif time_delta.days <= 3 and event_id not in user['notifications_sent']['three_days']:
                    # send 3 days notif
                    subject = "Upcoming event in less than 3 days"

                    body = f"""
The event {event['name']} starts in less than 3 days! It's on {event['start_date']} at {event['location']}. To see more go to {event['details_link']}.
"""
                    send_email(subject, body, user['email'])

                    user['notifications_sent']['three_days'].append(event_id)
                elif time_delta.days <= 7 and event_id not in user['notifications_sent']['seven_days']:
                    # send 1 week notif
                    subject = "Upcoming event in less than one week"

                    body = f"""
The event {event['name']} starts in less than one week! It's on {event['start_date']} at {event['location']}. To see more go to {event['details_link']}.
"""
                    send_email(subject, body, user['email'])

                    user['notifications_sent']['seven_days'].append(event_id)

def user_toggle_notifications(token):
    user_id = decode_token(token)
    user = get_user(user_id)
    result = db.users.update_one(
        { '_id': ObjectId(user_id) },
        {
            '$set': {
                'receive_notifications': not user['receive_notifications'],
            }
        }
    )
    if result.modified_count == 0:
        raise AccessError("User does not exist")
    return {}

def get_user(user_id):
    return db.users.find_one({'_id': ObjectId(user_id)})


def user_manage_events(token):
    user_id = decode_token(token)
    user = get_user(user_id)
    if user is None:
        raise AccessError('User does not exist')
    creator_events = event_ids_to_events(user['owned_events'])
    managed_events = event_ids_to_events(user['managed_events'])
    return {
        'creator': creator_events,
        'manager': managed_events
    }

def relevant_info_user(user):
    return {
        '_id': user['_id'],
        'username': user['username'],
        'email': user['email'],
    }

def user_get_all(token):
    user_id = decode_token(token)
    if not is_admin(user_id):
        raise AccessError('Only admins may access user list')
    return {
        'users': list(
            map(
                relevant_info_user,
                map(
                    stringify_id,
                    db.users.find()
                )
            )
        ),
    }

def user_delete(token, to_be_deleted):
    user_id = decode_token(token)
    if not is_admin(user_id):
        raise AccessError('Only admins may delete users')
    response = db.users.delete_one({ '_id': ObjectId(to_be_deleted) })
    if response.deleted_count == 0:
        raise Exception('Failed to delete user')
    return {}
