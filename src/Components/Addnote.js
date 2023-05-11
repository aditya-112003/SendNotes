import React, { useContext, useState } from 'react'
import noteContext from '../Context/notes/notecontext'

const Addnote = () => {
    const context = useContext(noteContext)
    const { addnote , showAlert } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addnote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        showAlert("note has been added successfully","success")
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className='my-3 container'>
            <h1>Add a note</h1>
            <form className='my-2'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} value={note.title}/>
                    <div className="col-auto">
                        <span id="passwordHelpInline" className="form-text">
                            Must be more than 5 characters long.
                        </span>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' onChange={onChange} value={note.description}/>
                    <div className="col-auto">
                        <span id="passwordHelpInline" className="form-text">
                            Must be more than 5 characters long.
                        </span>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} value={note.tag}/>
                </div>
                <button disabled={note.title.length<5 || note.description.length<5 } type="submit" className="btn btn-primary" onClick={handleClick}>Add a Note</button>
            </form>
        </div>
    )
}

export default Addnote