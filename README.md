# Installation
## Docker
As our project uses Docker to simplify the installation process, it must be installed before proceeding according to their installation instructions.
## Secrets
Before we can run the docker and install our app, we must first set up the environment variables required to run it. Assuming you have access to the codebase already by cloning the repository, simply navigate to the root directory of the project, then create a plain text file named .env and copy the following values in the file:

```
# see installation manual for secrets
```

Then navigate to the frontend directory within the project and copy the following value into the file:

```
# see installation manual for secrets
```


## Installation
Ensure that the Docker app is open, then run the command “docker-compose up” in the root directory of the project and you will be able to access the url http://127.0.0.1:5173 on your browser.

# Things to note
## AI summary
The AI button can only be run on the admin page, and each run will prompt the below popup as it costs money. 

![alt text](image.png)

When the ChatGPT funds have run out, it will prompt the message below, indicating that the function will no longer work.

![alt text](image-1.png)