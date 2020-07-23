const express = require('express');
const router = express.Router();
const Day = require('../models/Day');
const Food = require('../models/Food');
const moment = require('moment');
const verify = require('./verifyToken');
const jwt = require('jsonwebtoken');
const getUser = require('./getUser');


router.get('/', verify, async (req,res) => {
    try{
        const days = await Day.find();
        res.json(days);
    }catch(e){
        res.json({message:e});
    }
});

router.post('/', verify, async (req,res) => {
    const day = new Day({
        date: req.body.date
    });

    try{
    const daySaved = await day.save();
    res.json(daySaved);
    }catch(e){
        res.json({message: e});
    }
});

router.get('/:dayDate', verify, async (req,res) => {
    let timeToSave = moment(req.params.dayDate)
    // .subtract(2,"hours")
    .format('YYYY-MM-DD'); 
    const userId = getUser(req.header('auth-token')); 
    try{
        const day = await Day.find({date: timeToSave, userId: userId});
        if(day.toString() == "" || day[0].foods.length<=0)
            res.json({message: "day not found"});
        res.json(day);
    }catch(e){
        res.json({message: e});
    }
});

// router.delete('/:postId', async (req,res) => {
//     try{
//     const removedPost = await Post.remove({_id: req.params.postId});
//     res.json(removedPost);
//     }catch(e){
//         res.json({message:e});
//     }
// });

module.exports = router;