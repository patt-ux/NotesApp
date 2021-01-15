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
        const note = db.get('notes').find({ id: parseInt(req.params.id) }).value();
        res.send(note);
    });

    // POST
    // create a note
    app.post('/api/notes', (req, res) => {
        const note = db.get('notes').last().value();
        // setting note id to 1 more than last id in array.
        // not using index or count to avoid duplicate ids
        var noteId = 1; // init ids at 1 for humans
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
        try{
            db.get('notes').find({ id: parseInt(req.params.id)}).assign({ title: req.body.title, body: req.body.body }).write();
        } catch(e) {
            throw new Error("unable to find note for deletion");
        }
        // search the array again to fix weird caching;
        const note = db.get('notes').find({ id: parseInt(req.params.id)}).value();
        if(!note) { res.send(true);}
        res.send(false);
    });


    // DELETE 
    // delete all notes
    app.delete('/api/notes', (req, res) => {
        db.set('notes', []).write();
        res.send(db.get('notes'));
    });

    // delete a specfic note
    app.delete('/api/notes/:id', (req, res) => {
        db.get('notes').remove({ id: parseInt(req.params.id)}).write();
        // ensuring note deleted
        db.get('notes').find({ id: parseInt(req.params.id)}).value();
        res.send("note deleted");
    });

    // persist notes - default values
    return db.defaults({ notes: [] }).write()
})
.then(() => {
    app.listen(port, () => console.log(`Listening on port ${port}`))
})
