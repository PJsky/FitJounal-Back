const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const verify = require('./verifyToken');


router.get('/', verify, async (req,res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(e){
        res.json({message:e});
    }
});

router.post('/', verify, async (req,res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try{
    const postSaved = await post.save();
    res.json(postSaved);
    }catch(e){
        res.json({message: e});
    }
});

router.get('/:postId', verify, async (req,res) => {
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }catch(e){
        res.json({message: e});
    }
    
});

router.delete('/:postId', verify, async (req,res) => {
    try{
    const removedPost = await Post.remove({_id: req.params.postId});
    res.json(removedPost);
    }catch(e){
        res.json({message:e});
    }
});

router.patch('/:postId', verify, async (req,res) => {
    try{
    const updatedPost = await Post.updateOne(
                        { _id: req.params.postId },
                        { $set: { title: req.body.title } }
                                             );
    res.json(updatedPost);
    }catch(e){
        res.json({message:e});
    }
});

module.exports = router;