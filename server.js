const express = require('express');
const cors = require("cors");
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync')

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

const adapter = new FileAsync('db.json')
low(adapter).then(db => {
    // GET list of all notes
    app.get('/api/notes', (req, res) => {
        res.send(db.get('notes'));
    });

    // GET list note by id
    app.get('/api/notes/:id', (req, res) => {
        if(req.params.id) {
            const note = db.get('notes').find({ id: parseInt(req.params.id) }).value();
            res.send(note);
        } else {
            throw new Error("note id is required");
        }
    });

    // POST
    // create a note
    app.post('/api/notes', (req, res) => {
        const note = db.get('notes').last().value();
        // setting note id to 1 more than last id in array.
        // not using index or count to avoid duplicate ids
        var noteId = 1; // init note ids at 1 for humans
        if(note) {noteId = note.id + 1;}
        db.get('notes')
            .push(req.body)
            .last()
            .assign({ id: noteId, title: req.body.title, body: req.body.body })
            .write()
            .then(note => res.send(note));
    });

    // PUT 
    // update a specfic note
    app.put('/api/notes/:id', (req, res) => {
        if(req.params.id) {
            try{
                db.get('notes').find({ id: parseInt(req.params.id)}).assign({ title: req.body.title, body: req.body.body }).write();
            } catch(e) {
                throw new Error("unable to find note for update");
            }
            // search the array again to fix weird caching
            const note = db.get('notes').find({ id: parseInt(req.params.id)}).value();
            res.send(note);
        } else {
            throw new Error("note id is required");
        }
    });


    // DELETE 
    // delete all notes
    app.delete('/api/notes', (req, res) => {
        try{
            db.set('notes', []).write();
        } catch(e) {
            throw new Error("unable to delete notes");
        }
        res.send(db.get('notes'));
    });

    // delete a specfic note
    app.delete('/api/notes/:id', (req, res) => {
        if(req.params.id) {
            let result = "note deleted";
            try{
                db.get('notes').remove({ id: parseInt(req.params.id)}).write();
                // search the array again to fix weird caching
                db.get('notes').find({ id: parseInt(req.params.id)}).value();
            } catch(e) {
                result = "unable to delete note";
            }
            res.send(result);
        } else {
            throw new Error("note id is required");
        }
    });

    // persist notes - default values
    return db.defaults({ notes: [] }).write()
})
.then(() => {
    app.listen(port, () => console.log(`Listening on port ${port}`))
})