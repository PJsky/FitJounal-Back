const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {registerValidation, loginValidation} = require('../routes/validation');

router.post('/register', async (req,res) =>{

    //Validate b4 creating user
    const {error} = registerValidation(req.body); 
    if(error) res.status(400).send(error.details[0].message);

    //Check if passwords are the same
    const samePasswords = (req.body.password == req.body.password_confirmation);
    if(!samePasswords) return res.status(400).send("Passwords do not match");

    //Checking if the user exists
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists) return res.status(400).send('Email already exists');
    
    //Hash with salt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send({user: user._id});
    }catch(err){
        res.status(400).send(err);
    }
});

//Login
router.post('/login', async (req,res)=>{
    
    //Validate b4 checking
    const {error} = loginValidation(req.body); 
    if(error) res.status(400).send(error.details[0].message);

    //Checking if the user exists
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email does not exist');
    
    //Comparing passwords
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    //Create and assign a token
    const token = jwt.sign({_id:user._id}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.header('auth-token', token).send(token);
    res.send('Logged in');
})

module.exports = router;