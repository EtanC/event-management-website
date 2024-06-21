from backend.src.error import AccessError, InputError
from backend.src.database import db
from bson import ObjectId

# NOTE: keeping contact info as just email for now until we hear more

def get_profile_details(token):
	# check token validity
	user = db.users.find_one({"_id": ObjectId(token)})

	if user is None: 
		raise AccessError('Invalid Token')

	return { 	'username': f"{user['username']}", 
				'email': f"{user['email']}",
				'preferences': f"{user['preferences']}"		}

# mayeb won't deal with profile pics first, but might have to use GridFS to store on mongoDB
def update_profile_details(token, username, email, old_password, new_password, re_password, preferences):
	
	filter = { '_id': ObjectId(token) }

	user = db.users.find_one({"_id": ObjectId(token)})

	if user is None: 
		raise AccessError('Invalid Token')
	elif old_password and old_password != user['password']:
		raise InputError("Old password doesn't match")
	elif new_password != re_password:
		raise InputError("New passwords don't match")


	changed_values = { "$set": {}}

	if username:
		changed_values['$set']['username'] = username
	if email:
		changed_values['$set']['email'] = email
	if old_password == user['password'] and new_password == re_password:
		changed_values['$set']['password'] = new_password
	if preferences:
		changed_values['$set']['preferences'] = preferences
	# if profile_pic: 
	# 	changed_values['$set']['profile_pic'] = profile_pic
	
	result = db.users.update_one(filter, changed_values)
	if result.matched_count == 0:
		raise AccessError('User ID not found on database')
