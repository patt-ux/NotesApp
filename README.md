# NotesApp
A no-frills, self contained notes application and lightweight node api for taking simple notes.
* Mini-API server built with Node, Express, LowDB to handle persisting and CRUD operations.
    * Each note has the properties id (integer), title (string), body (string):
        * `{"id":0, "title":"A Title", "body": "A Body"}`
        * Note id field is incremented based on last note in DB. This is to prevent duplicates. Ids for notes start at 1.
        * title requires at least 3 characters for note creation or update
        * body can be blank - sometimes you just need a placeholder note
    * GET `/api/notes` returns all notes
    * GET `/api/notes/{id}` returns a specific note
    * POST `/api/notes` creates a new note
    * PUT `/api/notes/{id}` updates a specific note
    * DELETE `/api/notes` deletes all notes
    * DELETE `/api/notes/{id}` deletes a specific note
* React UI for humans to easily create, view, edit and delete notes without needing to download Postman or similar API apps.
    * Uses Bootstrap 4 CSS library for mobile first design

## About the folder structure
* The root folder contains necessary files for mini-api:
    * package.json
    * server.js
    * db.json contains persisted data and is created automatically by the server on run.
* `/client` folder contains necessary files for the React UI. This was created using the create-react-app typescript template.

## Getting Started
1. You will Need to have Node installed.
    * You can download node from https://nodejs.org/en/ - this app is built on version 14.15.4
2. Clone or Download this repo from Github
    * To CLONE - You will need GIT
        1. Install GIT - if you don't already have it (https://git-scm.com/downloads)
        2. Open a Command Prompt (Windows) or Terminal (MacOS)
            * To open a Command Prompt on Windows, search for "CMD"
            * To open a Terminal on MacOS, search for "Terminal"
        3. In the Command Prompt/Terminal window, navigate to the folder you want to install this repo into
        4. Clone the repo:
        ```
        git clone https://github.com/patt-ux/NotesApp.git
        ```
    * To Download, simply download the ZIP file for this repo and unzip it into the directory where you want it installed.
3. Install node modules for the server app:
    * Open a Command Prompt/Terminal window, and navigate to where the app was cloned/unzipped to. We will refer to this as the _SERVER TERMINAL_.
    * Run `npm install`
4. Install node modules for the client app:
    * Open another Command Prompt/Terminal window and navigate to where the app was cloned/unzipped to.  We will refer to this as the _CLIENT TERMINAL_.
    * Navigate to the client directory `cd client`
    * Run `npm install`
5. You should have 2 Command Prompt/Terminal Windows open at this point. One is pointing to /NotesApp (the _SERVER TERMINAL_)and the other is pointing to /NotesApp/client (the _CLIENT TERMINAL_). If you do not have 2 Command Prompt/Terminal Windows open, please re-read Steps 3 and 4.
6. Run the Server:
    * In the _SERVER TERMINAL_ type `node server.js` to run the node server.
    * If all goes well you should see `Listening on port 5000`
7. Run the React Client App:
    * In the _CLIENT TERMINAL_ type `npm start` to run the react app.
    * If all goes well, you should see `Compiled successfully!` in the terminal and the app open in a browser window.
    * If the app does not open in a browser and the app compiled sucessfully, navigate to `localhost:3000` to see the app.


## Stopping the Server
* While developing, you may need to stop the server.
* WINDOWS USERS:
    * In COMMAND PROMPT windows press the CTRL and C keys at the same time.
* MAC USERS:
    * In a Terminal Window press the Apple CMD and C keys at the same time. 
* Press the keys again if necessary to stop all processes on the terminal.
* You may also attempt to close/kill the terminal application to stop the process.
* You will need to do this for BOTH the _SERVER TERMINAL_ and _CLIENT TERMINAL_ to stop the processes.