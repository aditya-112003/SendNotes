import React, { useContext } from 'react'
import noteContext from '../Context/notes/notecontext'


const NoteItem = (props) => {
    const context = useContext(noteContext)
    const { deletenote , showAlert } = context;
    const { noteq , updateNote } = props
    const handleClick = () => {
        deletenote(noteq._id);
        showAlert("Note has been deleted successfully","success")
    }
    return (
        <div className='col-md-3'>
            <div className="card my-3" >
                <div className="card-body">
                    <h5 className="card-title">{noteq.title}</h5>
                    <p className="card-text">{noteq.description}</p>
                    <p className="card-text">{noteq.tag}</p>
                    <i className="fa-solid fa-trash mx-2" onClick={handleClick}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{updateNote(noteq)}}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem