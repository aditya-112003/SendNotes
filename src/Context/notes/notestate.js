import noteContext from "./notecontext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)
    const [alert, setAlert] = useState(null)

    //Shows the Alert
    const showAlert = (messages, type) => {
        setAlert({
            msg: messages,
            type: type
        })
        setTimeout(() => {
            setAlert(null);
        }, 2000);
    }

    //Get all notes
    const getnotes = async () => {

        //API call
        const response = await fetch(`${host}/api/notes/fetchnotes`, {
            method: "GET",
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setNotes(json)
    }

    //Add a note
    const addnote = async (title, description, tag) => {

        //API call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
        });
        const json = response.json();

        //Client side code
        console.log('adding a new note')
        const note = {
            "_id": "6448126174e8467bf406c898",
            "user": "6446bca654ebf6620be6a9d1",
            "title": title,
            "description": description,
            "tags": tag,
            "date": "2023-04-25T17:48:17.881Z",
            "__v": 0
        };
        setNotes(notes.concat(note));
    }

    //Delete a note
    const deletenote = async (id) => {
        console.log('note deleted unsuccessfully' + id)
        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote);

        //API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },

        });
        const json = response.json();
        console.log(json);
    }
    //Edit a note
    const editnote = async (id, title, description, tag) => {
        //API call
        const response = await fetch(`http://localhost:5000/api/notes/updatenote/${id}`, {
            method: "PUT",
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header

        });
        const json = response.json();

        //Client side edit note
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    }

    return (
        <noteContext.Provider value={{ notes, getnotes, addnote, deletenote, editnote ,showAlert , alert}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState