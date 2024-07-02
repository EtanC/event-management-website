from backend.src.error import AccessError, InputError
from backend.src.database import db, fs
from backend.src.config import config
from backend.src.auth import hash
from bson import ObjectId
import jwt
import hashlib

# NOTE: keeping contact info as just email for now until we hear more

def get_profile_details(token):

	try:  
		token = jwt.decode(token, config['SECRET'], algorithms=['HS256'])
	except jwt.ExpiredSignatureError:
		raise AccessError('Token has expired')
	except jwt.InvalidTokenError:
		raise AccessError('Invalid token')

	user_id = token['user_id']

	# check token validity
	user = db.users.find_one({"_id": ObjectId(user_id)})
	file_id = user['profile_pic_id']
	file_data = fs.get(file_id).read()

	# might return file_data as Base64 encoded 


	return { 	'username': f"{user['username']}", 
				'email': f"{user['email']}",
				'preferences': user['preferences']		}

# mayeb won't deal with profile pics first, but might have to use GridFS to store on mongoDB
def update_profile_details(token, username, email, old_password, new_password, re_password, preferences, profile_pic):

	try:  
		token = jwt.decode(token, config['SECRET'], algorithms=['HS256'])
	except jwt.ExpiredSignatureError:
		raise AccessError('Token has expired')
	except jwt.InvalidTokenError:
		raise AccessError('Invalid token')

	user_id = token['user_id']

	filter = { '_id': ObjectId(user_id) }

	user = db.users.find_one({"_id": ObjectId(user_id)})

	# might be overdoing these but just in case ig

	if old_password is not None:
		hashed_old_password = hash(old_password)

	if old_password and hashed_old_password != user['password']:
		raise InputError("Old password doesn't match")
	elif not old_password and new_password:
		raise InputError('Old password required')
	elif old_password and new_password and not re_password:
		raise InputError('Please re-enter your new password')
	elif old_password and not new_password and re_password:
		raise InputError('Please enter your new password')
	elif old_password and new_password != re_password:
		raise InputError("New passwords don't match")

	changed_values = { "$set": {}}

	if username:
		changed_values['$set']['username'] = username
	if email:
		changed_values['$set']['email'] = email
	if old_password and hashed_old_password == user['password'] and new_password == re_password:
		changed_values['$set']['password'] = hash(new_password)
	if preferences:
		changed_values['$set']['preferences'] = preferences
	if profile_pic and profile_pic.filename != '': 
		# value was passed for profile_pic 

		# store the profile pic onto gridfs
		file_id = fs.put(profile_pic)

		# store profile pic id that is used to reference gridfs
		changed_values['$set']['profile_pic_id'] = file_id


	result = db.users.update_one(filter, changed_values)
	if result.matched_count == 0:
		raise AccessError('User ID not found on database')