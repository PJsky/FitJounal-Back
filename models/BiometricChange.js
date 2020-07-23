const mongoose = require('mongoose');

const BiometricChangeSchema = mongoose.Schema({
    biometricName: {
        type: String,
        required:true
    },
    value: {
        type: Number,
        required:true
    }
});

module.exports = mongoose.model('BiometricChanges', BiometricChangeSchema);