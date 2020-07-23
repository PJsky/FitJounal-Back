const mongoose = require('mongoose');
const Note = require('./Note');
const BiometricChange = require('./BiometricChange');
const Food = require('./Food');

const DaySchema = mongoose.Schema({
    date: {
        type: Date,
        required:true
    },
    foods: [Food.schema],
    biometricChanges: [BiometricChange.schema],
    notes: [Note.schema],
    userId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Day', DaySchema);