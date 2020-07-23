const mongoose = require('mongoose');

const FoodSchema = mongoose.Schema({
    description: {
        type: String,
        required:true
    },
    amount: {
        type: Number,
        required:true
    },
    serving:{
        type: String,
        default: "g"
    },
    defaultServing:{
        type:String,
        required:false
    },
    defaultServingChosen:{
        type: Boolean,
        default: false
    },
    calories:{
        type:Number,
        default: 0
    },
    protein:{
        type:Number,
        default: 0
    },
    carbohydrates:{
        type:Number,
        default: 0
    },
    fat:{
        type:Number,
        default: 0
    }
});


module.exports = mongoose.model('Foods', FoodSchema);
