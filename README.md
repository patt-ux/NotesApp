# NotesApp
A no-frills, self contained notes application and lightweight (no swagger, sorry) node api for taking simple notes.
* Mini-API server built with Node, Express, LowDB to handle persisting and CRUD operations.
    * Each note has the properties id (integer), title (string), body (string)
    * GET `/api/notes` returns all notes
    * GET `/api/notes/{id}` returns a specific note
    * POST `/api/notes` creates a new note
    * PUT `/api/notes/{id}` updates a specific note
    * DELETE `/api/notes` deletes all notes
    * DELETE `/api/notes/{id}` deletes a specific note
* React-Typescript UI for humans to easily view, edit and delete notes.

## Getting Started
1. Clone or Download this repo from Github
2. Setup the server app:
    * In a terminal or command prompt window, navigate to the root of this repo (e.g. NotesApp)
    * Run `npm install`
3. Setup the client app:
    * In a separate terminal or command prompt window, navigate to the root of this repo (e.g. NotesApp)
    * Navigate to the client directory `cd /client`
    * Run `npm install`
4. Run the Server:
    * In the server app terminal or command prompt window (see step 2), run the node server `node server.js`
    * If all goes well you should see `Listening on port 5000`
5. Run the React Client App:
    * In the client app terminal or command prompt window (see step 3), run the react app `npm start`
    * If all goes well, you should see `Compiled successfully!` in the terminal and the app open in a browser window.
    * If the app does not open in a browser and the app compiled sucessfully, navigate to `localhost:3000` to see the app.

## Stopping the Apps
* In both the server app terminal and the client app terminal press the CTRL and C keys at the same time (or CMD and C for Mac). Press again if necessary to stop all processes on the terminals. You may also attempt to close/kill the terminal applications to stop the processes.