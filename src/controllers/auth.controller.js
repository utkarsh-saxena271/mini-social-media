const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

async function registerController(req,res){
    const {username, password} = req.body;
    const isUserExists = await userModel.findOne({
        username
    });
    if(isUserExists){
        return res.status(401).json({
            message : "username already exists"
        })
    }
    const user = await userModel.create({
        username,
        password : await bcrypt.hash(password, 10)
    })
    const token = jwt.sign({
        id: user._id
    },process.env.JWT_SECRET)

    res.cookie("token",token);
    res.status(201).json({
        message: "User registered successfully",
        user
    })

}
async function loginController(req,res){
    const {username,password} = req.body;
    const user = await userModel.findOne({
        username
    })
    if(!user){
        return res.status(401).json({
            message : "user not found"
        })
    }
    const isPasswordValid = bcrypt.compare(password,user.password);
     if(!isPasswordValid){
        return res.status(401).json({
            message : "password invalid"
        })
     }
     
    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)

    res.cookie("token",token);
    res.status(201).json({
        message : "User logged in successfully",
        user : {
            username : user.username,
            id: user._id
        }
    })
}

module.exports = {
    registerController,
    loginController
}