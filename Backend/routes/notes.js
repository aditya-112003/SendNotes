const express = require('express');
const router = express.Router();
const fetchuser = require('../Middleware/fetchuser');
const Notes = require('../Models/Notes');
const { body, validationResult } = require('express-validator');

//login for a user using : GET "/api/notes/fetchnotes" . login required
router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('unkown error occured')
    }
})

//add a new note using : POST "/api/notes/addnote" . login required
router.post('/addnote', fetchuser, [
    body("title").isLength({ min: 3 }),
    body('description').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.send({ errors: result.array() });
            return
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const saved = await note.save()
        res.json(saved)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('unkown error occured')
    }
})

//update an existing note using : PUT "/api/notes/updatenote" . login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //create a newNote
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        //Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found")
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        // res.json({note});
        res.json({ note });
    } catch (error) {
        console.log(error.message)
        res.status(500).send('unkown error occured')
    }
})

// Deleting a existing note using : DELETE "/api/notes/deletenote" . login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //Find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found")
        }
        //checks if user is valid or fake
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ msg: "Note has been deleted successfully", note: note });
        // res.send("Note has been deleted successfully")
    } catch (error) {
        console.log(error.message)
        res.status(500).send('unkown error occured')
    }
})

module.exports = router