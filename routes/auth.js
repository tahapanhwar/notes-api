const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const router  = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({ message: 'Email and Password are required'});
    }

    const existing = await User.findOne({email});
    if(existing){
        return res.status(400).json({message: 'Email already registered'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({email, password: hashedPassword});

    res.status(201).json({ message: 'User registered', userId: user._id});
    }
    catch (err){
        console.log(err);
        res.status(500).json({ message: 'Server error'});
    }

});

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({message: 'Email and password are required'});
    }

    const user = await User.findOne({email});

    if(!user){
        return res.status(400).json({ message: 'invalid email or password'});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(400).json({ message: 'Invalid email or password'});
    }
    
    const token = jwt.sign(
        {userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1d'}
    )
    res.json({ message: 'Login Successful' , token});
    }

    catch (err){
        console.log(err);
        res.status(500).json({ message: 'Server error'});
    }

})

module.exports = router;