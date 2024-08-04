# Installation Manual
## Docker
As our project uses Docker to simplify the installation process, it must be installed before proceeding according to their installation instructions.
## Secrets
Before we can run the docker and install our app, we must first set up the environment variables required to run it. Assuming you have access to the codebase already by cloning the repository, simply navigate to the root directory of the project, then create a plain text file named .env and copy the following values in the file:

```
AI_TOKEN = "sk-None-lvcacDu0bSeVxvxH6Nn9T3BlbkFJZRhTpHmLKbTeWNb7FEns"
GOOGLE_CLIENT_SECRET = "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"
MONGODB_CONNECTION_STRING = "mongodb+srv://comp3900:wowilovecompsci123@comp3900-database.dkmw7l9.mongodb.net/?retryWrites=true&w=majority&appName=COMP3900-Database"
APP_PASSWORD = "junp aluu zwky ofus"
APP_EMAIL = "project41pls@gmail.com"
AUTH_SECRET = "BUTTERFLY"
```

Then navigate to the frontend directory within the project and copy the following value into the file:

```
VITE_GOOGLE_CLIENT_ID = 201810108547-i12s527t5e8ejqj3pr888s7a7ojatfdm.apps.googleusercontent.com
```


## Installation
Ensure that the Docker app is open, then run the command “docker-compose up” in the root directory of the project and you will be able to access the url http://127.0.0.1:5173 on your browser.

# Things to note
## AI summary
The AI button can only be run on the admin page, and each run will prompt the below popup as it costs money. 

![alt text](image.png)

When the ChatGPT funds have run out, it will prompt the message below, indicating that the function will no longer work.

![alt text](image-1.png)