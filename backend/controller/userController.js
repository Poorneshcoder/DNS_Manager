const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const User = require("../models/userModel");


// post request for registering users

const register = async (req, res) => {
    try {
        const {email, username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({email, username, password: hashedPassword});
        await newUser.save();
        res.status(201).json({message: "User created successfully"});
    } catch (error) {
        res.status(500).json({error: "Error signing up"});
    }
}

// get request for registered users

const fetchRegistered = async (req, res) => {
    try {
        const users = await User.find();
        res.status(201).json(users);
    } catch (error) {
        res.status(500).json({error: "Unable to get users"});
    }
}

// get login 

const fetchedLogin = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.status(401).json({error: "Invalid Credentials"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({error: "Invalid Credentials"})
        }
        const token = jwt.sign({userId: user._id}, process.env.SECRET_KEY, {expiresIn: "1hr"} );
        res.json({message: "Login Successful"});
    } catch (error) {
        res.status(500).json({error:"Error Logging In"});
    }
}

module.exports = {register, fetchRegistered, fetchedLogin};