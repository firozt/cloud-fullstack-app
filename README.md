# File Structure

### .github/workflows/

Contains github actions workflows that automatically uploads all data from the `src` directory to the s3 bucket, builds a new docker image and pushes it to an ECR, runs cypress tests on UI and eslint/formatting on codebase

### src/

Contains source files, all contents of this directory will be pushed to the S3 bucket on passing of tests

### Dockerfile

Tells docker how to build this project into a docker image

### Cypress/

Contains cypress files for UI testing

### Cypress/fixtures

Contains json files that act as test data

### Cypress/support

Contains helper functions imported by the test logic

### Cypress/e2e

Contains the end to end tests for the project

# Running Locally

Build the docker image using <br>
`docker build -t static-file .`

Run the docker image as a container <br>
`docker run --name webserver -p 8080:80 static-file`
