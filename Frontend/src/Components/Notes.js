import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../Context/notes/notecontext'
import NoteItem from './NoteItem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
    const context = useContext(noteContext)
    const { notes, getnotes, editnote, showAlert } = context;
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')){
            getnotes()
        }else{
            navigate('/login')
        }
    })
    const [note, setNote] = useState({ title: "", description: "", tag: "goo kha" })
    const handleClick = (e) => {
        e.preventDefault();
        editnote(note._id, note.title, note.description, note.tag)
        showAlert("Note Updated successfully","success")
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const updateNote = (currentNote) => {
        setNote(currentNote)
    }
    return (
        <>
            <Addnote />
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-2'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} value={note.title} />
                                    <div className="col-auto">
                                        <span id="passwordHelpInline" className="form-text">
                                            Must be more than 5 characters long.
                                        </span>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" name='description' onChange={onChange} value={note.description} />
                                    <div className="col-auto">
                                        <span id="passwordHelpInline" className="form-text">
                                            Must be more than 5 characters long.
                                        </span>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} value={note.tag} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.title.length<5 || note.description.length<5 } type="button" className="btn btn-primary" onClick={handleClick} data-bs-dismiss="modal">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3 '>
                <h2 className='my-3'>Your Notes</h2>
                <div className="container">
                    {notes.length === 0 && "please type some notes"}
                </div>
                {notes.map((noteq) => {
                    return <NoteItem key={noteq._id} updateNote={updateNote} noteq={noteq} />
                })}
            </div>
        </>
    )
}

export default Notes