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

### docker-compose
Orchestrates all docker containers/services making it easier to run all containsers from one file


# Running Locally

To run the docker container(s) we simple run the docker compose command <br>
`docker compose up`
