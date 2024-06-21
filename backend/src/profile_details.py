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
				'email': f"{user['email']}"		}

def update_profile_details(token, username, email, password, re_password, preferences, profile_pic):
	
	filter = { '_id': ObjectId(token) }

	password_match = (password == re_password)

	changed_values = { "$set": {}}

	if username:
		changed_values['$set']['username'] = username
	if email:
		changed_values['$set']['email'] = email
	if password_match and password:
		changed_values['$set']['password'] = password
	if preferences:
		changed_values['$set']['preferences'] = preferences
	if profile_pic: 
		changed_values['$set']['profile_pic'] = profile_pic
	
	result = db.users.update_one(filter, changed_values)

	if result.matched_count == 0:
		raise AccessError('Invalid Token')