const express = require('express');
const auth = require('../middleware/auth');
const Note = require('../models/note');
const user = require('../models/user');
const mongoose = require('mongoose');


const router = express.Router();

router.get('/', auth, async (req, res) => {
    try {
        const notes = await Note.find({user: req.userId}).sort({createdAt: -1 });
        res.json(notes);
    }
    catch (err){
        console.log(err);
        res.status(500).json({ message: 'Server error'});
    }
});

router.post('/', auth, async (req, res) =>{
    try {
        const {title, content} = req.body;
    
    if(!title){
        return res.json({message: 'title is required'});
    }
    const note = await Note.create({
        title: title,
        content: content,
        user: req.userId
    });

    res.status(201).json({message: 'Note Created', note});
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error'});
    }
    
});


router.delete('/:id', auth, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({ message: 'Invalid note id'});
        }
        
        const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.userId });

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json({ message: 'Note deleted' });
        }
        catch (err){
            console.log(err);
            res.status(500).json({ message: 'Server error'});
        }
});

router.put('/:id', auth, async (req, res) => {

    try {
        console.log('URL id:', req.params.id, '| token user:', req.userId);
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({ message: 'Invalid note id'});
        }

        const {title, content} = req.body;

        if(!title && content === undefined){
            return res.status(400).json({ message: 'Provide a title or content to update'});
        }

        const note = await Note.findOneAndUpdate(
            {_id: req.params.id, user: req.userId},
            {title, content},
            {returnDocument: 'after'}
        );
        
        if(!note){
            return res.status(404).json({ message: 'Note not found'});
        }
        res.json({ message: 'Note updated', note});

    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: 'Server error'});
    }

});

module.exports = router;