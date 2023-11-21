const User = require("../models/user");
const jwt = require("jsonwebtoken");

async function login(req,res) {
    try {
        res.status(200).json({
            message: "user logged in", user: req.body.email
        })
    } catch (error) {
        res.status(500).json({message: "Unable to login user", errorMessage:error.message});
        console.log(error);     
    }

};

async function register(req,res) {
    try {
        const userResponse = await User.create(req.body);
        const expirationTime = 1000*60*60*24*7;
        const privateKey = process.env.JWTPASSWORD;
        const payload = {
            email:req.body.email
        };
        const options = {
            expiresIn: expirationTime
        };
        const token = await jwt.sign(payload,privateKey,options);
        console.log(token);
        res.status(201).json({message:"user succesfully added", details: userResponse, token: token});
    } catch (error) {
        res.status(500).json({message: "Unable to register user", errorMessage:error.message});
        console.log(error);      
    }
}

async function listAllUsers(req,res) {
    try {
        const users = await User.findAll();
        res.status(200).json({message: "Here is all the users on the User tabel", users: users})
    } catch (error) {
        res.status(500).json({message: "Unable to list all users", errorMessage:error.message});
        console.log(error);    
    }

}

module.exports = {login, register, listAllUsers}