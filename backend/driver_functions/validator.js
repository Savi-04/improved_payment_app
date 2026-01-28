const express = require("express");

const user = require("../configuration/userModel");
const zod = require("zod");
// const { JWT_SECRET } = require("../configuration/config");
const moneyAccountSchema = require("../configuration/moneyAccountsSchema");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;





function signInValidator2(req, res){
    //this logic will be called by react when there is no authorization token in 
}




function signInValidator(req, res){

    //this logic will be called when a react can find a autorization token in local storage

    console.log("Signin validator called");




    const { userId } = req;
    const validUser = user.findById(userId);
    if(!validUser){
        return res.status(401).json({message: "Invalid credentials"});
    }

    res.status(200).json({message: "User signed in successfully"});

    //     const {email, password} = req.body;

    // const userFound = user.findOne({email: email, password: password});

    // if(userFound){
    //     res.status(200).json({message: "User signed in successfully"});
    // }
    // res.status(401).json({message: "Invalid credentials"});

    }

//zod schema for signup validation below

const signUpSchema = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    email: zod.string().email(),
    password: zod.string()
})



async function signUpValidator(req, res){
    
    
    console.log("Signup validator called");
    const signupInputValidation = signUpSchema.safeParse(req.body);

    if(!signupInputValidation.success){
        return res.status(400).json({message: "Invalid inputs"});
    }


    const { firstName, lastName, email, password } = req.body;

    const userExists = await user.findOne({email: email});


    if(userExists){
        res.status(409).json({message: "User already exists"});
    }

    const newUser = new user({
        firstName,
        lastName,
        email,
        password
    })
    await newUser.save();
    

    const userId = newUser._id;

    const token = jwt.sign({userId}, JWT_SECRET);
    
    //linking and creating assosciated money account for new user
    
    const newUserAccount = new moneyAccountSchema({
        userId: userId,
        balance: ((1*Math.random()*1000).toFixed(2))      //

    })
    await newUserAccount.save();

    res.status(201).json({message: "User registered successfully", token: token});
    
}



module.exports = {
    signInValidator,
    signUpValidator
};