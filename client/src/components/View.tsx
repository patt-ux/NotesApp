import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import NotesService from '../services/NotesService';
type NoteParams = {
    id: string; // parameters will always be a string (even if they are numerical)
};
type NoteProps = RouteComponentProps<NoteParams>;

/**
 * You can add a note.
 * You can edit a note.
 * You can navigate to a specific note in the url - e.g. "localhost:3000/1".
 */

// manages creating and editing notes
const View: React.FC<NoteProps> = ({ match }) => {
    // const serverUrl:string = "http://localhost:8080/api/notes";
    // note properties
    const [noteId, setNoteId] = useState(0);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            let note = { id: 0, title: "", body: "" };
            // id present - fetch note from server
            if (match.params.id) {
                let id = parseInt(match.params.id);
                if (id > 0) {
                    note.id = id;
                    // let url = serverUrl + "/" + match.params.id;
                    if (match.params.id) {
                        let res = await NotesService.get(id); // await axios.get(url);
                        note = res.data;
                    }
                }
            }
            // set the values with defaults or fetched data
            setNoteId(note.id);
            setTitle(note.title);
            setBody(note.body);
        }
        fetchData();
    }, [match.params.id]);

    // submit handler
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        console.log(noteId);
        // this is an existing note
        if (noteId > 0) {
            await updateNote();
        }
        // create a new note
        if (noteId === 0) {
            await createNote();
        }
        console.log("moo");
    }

    // create a note
    const createNote = () => {
        var data = JSON.stringify({ "title": title, "body": body });
        NotesService.create(data).then(
            (res: any) => {
                console.log(res);
                setNoteId(res.data.id);
                // reset window
                let url:string = window.location.href.split("/")[0] + "/" + res.data.id;
                window.history.pushState(null, title, url);
            });
    }
    // update a note
    const updateNote = async () => {
        var data = JSON.stringify({ "id": noteId, "title": title, "body": body });
        NotesService.update(noteId, data).then(
            (res: any) => {
                setNoteId(res.data.id);
            });
    }

    // delete note and prime new note
    const deleteNote = (event: any) => {
        event.preventDefault();
        NotesService.delete(noteId).then(
            (res: any) => {
                // reset form
                setNoteId(0);
                setTitle("");
                setBody("");
                // reset window url
                let url:string = window.location.href.split("/")[0] + "/add";
                window.history.pushState(null, title, url);
            });
    }

    return (
        <React.Fragment>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={"/"}>Notes</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{noteId > 0 ? title : "Create"}</li>
                </ol>
            </nav>
            <div className="d-flex p-2">
            <h1 className="font-weight-bold" style={{fontSize:"1.25rem"}}>{noteId > 0 ? title : "New Note"}</h1>
            </div>
            <form className="note-form p-2">
                <div className="form-group">
                    <label>Title</label>
                    <input className="form-control" type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                </div>
                <div className="form-group">
                    <label>Body</label>
                    <textarea className="form-control" value={body} onChange={(e) => { setBody(e.target.value) }}></textarea>
                    <small className="text-secondary">Plain text notes. Markup not supported.</small>
                </div>
                <div className="d-flex my-2">
                    <button className="btn btn-sm btn-primary mr-2" onClick={handleSubmit}>Save Note</button>
                    {noteId > 0 &&
                        <button className="btn btn-sm btn-danger" onClick={deleteNote}>Delete Note</button>
                    }
                </div>
            </form>
        </React.Fragment>
    );
};
export default withRouter(View);
