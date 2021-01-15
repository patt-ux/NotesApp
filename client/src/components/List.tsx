import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NotesService from '../services/NotesService';

// requirements:
/**
 * There should be a list of all notes.
 * The notes should be persisted and retrieved via a service.
 * You should be able to go straight to a note if specified in the url.
 */

 class NoteModel {
   public id:number = 0;
   public title:string = "";
   public body:string = "";
 }

 // Displays list of notes with options to edit
function List() {

  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    let res = await NotesService.getAll();
    setNotes(res.data);
  }

  const deleteNote = async (id:number) => {
    await NotesService.delete(id);
    await getNotes();
  }

  const deleteAll = async () => {
    await NotesService.deleteAll();
    await getNotes();
  }
  
  useEffect(() => {
    const fetchData = async () => {
      await getNotes();
    };
    fetchData();
  }, []);

  return (
      <div>
        <div className="d-flex p-2">
          <h1 className="font-weight-bold" style={{fontSize:"1.25rem"}}>All Notes</h1>
          <div className="ml-auto">
            <Link className="btn btn-sm btn-primary" to={"/add"}>Add Note</Link>
            {notes.length > 0 &&
                <button className="btn btn-sm btn-danger" onClick={deleteAll}>Delete All</button>
            }
          </div>
        </div>
        <table className="table table-striped border">
          <tbody>
            {notes.length === 0 &&
              <tr>
                <td>
                  <div className="p-4 text-center">
                    <div className="py-3" style={{fontSize:"1.25rem"}}>No notes available.</div>
                    <Link className="btn btn-sm btn-primary" to={"/add"}>Create a note?</Link>
                  </div>
                </td>
              </tr>
            }
            {notes.length > 0 &&
            <React.Fragment>
              {notes.map((note:NoteModel, i) => {
                return(
                  <tr key={note.id}>
                    <td>
                      <div className="d-flex">
                        <div className="font-weight-bold text-uppercase">{note.title}</div>
                        <div className="ml-auto">
                          <Link className="btn btn-sm btn-primary mx-2" to={'/' + note.id}>Edit</Link>
                          <button className="btn btn-sm btn-danger" onClick={() => deleteNote(note.id)}>Delete</button>
                        </div>
                      </div>
                      <div>{note.body}</div>
                    </td>
                  </tr>
                  )
              })}
            </React.Fragment>
            }
          </tbody>
        </table>
      </div>
  );
}

export default List;