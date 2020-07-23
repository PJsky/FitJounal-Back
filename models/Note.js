const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    NoteName: {
        type: String,
        required:true
    },
    NoteText: {
        type: String,
        required:true
    }
});

module.exports = mongoose.model('Notes', NoteSchema);