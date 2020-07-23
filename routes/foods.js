const express = require('express');
const router = express.Router();
const moment = require('moment');
const _ = require('lodash');
const Day = require('../models/Day');
const Food = require('../models/Food');
const Post = require('../models/Post');
const verify = require('./verifyToken');
const jwt = require('jsonwebtoken');
const getUser = require('./getUser');


router.get('/', verify, async (req,res) => {
    try{
        const foods = await Food.find();
        res.json(foods);
    }catch(e){
        res.json({message:e});
    }
});

router.post('/', verify, async (req,res) => {
    let timeToSave = moment(req.body.dayDate)
    // .subtract(2,"hours")
    .format('YYYY-MM-DD'); 
    const userId = getUser(req.header('auth-token'));
    try{
        let day = await Day.findOne({date: timeToSave, userId:userId});
        if(day==null){
            day = new Day({
                date: timeToSave,
                userId: userId
            });
        }
        const food = new Food({
            description: req.body.description,
            amount: req.body.amount,
            defaultServing: req.body.defaultServing,
            defaultServingChosen: req.body.defaultServingChosen,
            serving: req.body.serving,
            calories: req.body.calories,
            protein: req.body.protein,
            carbohydrates: req.body.carbohydrates,
            fat: req.body.fat,  
        });
        day.foods.push(food);
        day.save();
        res.json(day.foods);
    }catch(e){
        res.json({message: e});
    }    
});

router.delete('/', verify, async (req,res) => {
    const userId = getUser(req.header('auth-token'));
    try{
        let day = await Day.findOne({date: req.body.dayDate, userId: userId});
        day.foods.id(req.body.id).remove();
        await day.save();
        res.json(day);

    }catch(e){
        res.json({message:e});
    }
});

// router.get('/:postId', async (req,res) => {
//     try{
//         const post = await Post.findById(req.params.postId);
//         res.json(post);
//     }catch(e){
//         res.json({message: e});
//     }
    
// });



module.exports = router;