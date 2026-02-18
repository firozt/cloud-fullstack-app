# File Structure

### pipeline.yml

Automatically uploads all data from the `frontend` directory to the s3 bucket on each push to the main branch of the repo

### index.html

Main entrypoint of the website, takes user information via a form

### submitted.html

Shows a confirmation of the data the user has given into the form, showing each field given in a table

### script.js

Handles the saving of user input via the use of Javascript's sessions storage, storaing each field

### Dockerfile

Tells docker how to build this project into a docker image

# Running Locally

Build the docker image using <br>
`docker build -t static-file .`

Run the docker image as a container <br>
`docker run --name webserver -p 8080:80 static-file`
