# NotesApp
A no-frills, self contained notes application and lightweight node api for taking simple notes.
* Mini-API server built with Node, Express, LowDB to handle persisting and CRUD operations.
    * Each note has the properties id (integer), title (string), body (string):
        * `{"id":0, "title":"A Title", "body": "A Body"}
        * Note id field is incremented based on last note in DB. This is to prevent duplicates. All note DBs start at id 1.
        * title requires at least 3 characters for note creation
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
3. Setup the server app:
    * In a terminal or command prompt window, navigate to the root of this repo (e.g. NotesApp)
    * Run `npm install`
4. Setup the client app:
    * In a separate terminal or command prompt window, navigate to the root of this repo (e.g. C:/NotesApp)
    * Navigate to the client directory `cd /client`
    * Run `npm install`
5. Run the Server:
    * In the server app terminal or command prompt window (see step 2), run the node server `node server.js`
    * If all goes well you should see `Listening on port 5000`
6. Run the React Client App:
    * In the client app terminal or command prompt window (see step 3), run the react app `npm start`
    * If all goes well, you should see `Compiled successfully!` in the terminal and the app open in a browser window.
    * If the app does not open in a browser and the app compiled sucessfully, navigate to `localhost:3000` to see the app.

## Stopping the Apps
* In both the server app terminal and the client app terminal press the CTRL and C keys at the same time (or CMD and C for Mac). Press again if necessary to stop all processes on the terminals. You may also attempt to close/kill the terminal applications to stop the processes.
