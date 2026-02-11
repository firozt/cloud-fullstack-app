# File Structure
```
/.github/workflows/*.yml  # Contains yaml pipeline files
/frontend
│
├── index.html            # Main entry page
├── submitted.html        # Submission confirmation page
│
├── /scripts              # JavaScript files
│   └── script.js
│
├── /img                  # Static image assets
│   └── testimg.jpg
```

### pipeline.yml
Automatically uploads all data from the `frontend` directory to the s3 bucket on each push to the main branch of the repo

### index.html
Main entrypoint of the website, takes user information via a form

### submitted.html
Shows a confirmation of the data the user has given into the form, showing each field given in a table

### script.js
Handles the saving of user input via the use of Javascript's sessions storage, storaing each field
