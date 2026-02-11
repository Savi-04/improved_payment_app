const express = require("express");

const user = require("../configuration/userModel");
const zod = require("zod");
const bcrypt = require("bcrypt");
// const { JWT_SECRET } = require("../configuration/config");
const moneyAccountSchema = require("../configuration/moneyAccountsSchema");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;





const signInSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6)
});

async function signInValidator(req, res) {
    console.log("Signin validator called");

    const { success } = signInSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: "Incorrect inputs"
        })
    }

    const { email, password } = req.body;
    const userFound = await user.findOne({
        email
    });

    if (userFound) {
        const passwordMatch = await bcrypt.compare(password, userFound.password);
        if (passwordMatch) {
            const token = jwt.sign({
                userId: userFound._id
            }, JWT_SECRET);

            res.json({
                token: token
            })
            return;
        }
    }

    res.status(411).json({
        message: "Error while logging in"
    })
}

//zod schema for signup validation below

const signUpSchema = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(6)
})



async function signUpValidator(req, res) {


    console.log("Signup validator called");
    const signupInputValidation = signUpSchema.safeParse(req.body);

    if (!signupInputValidation.success) {
        return res.status(400).json({ message: "Invalid inputs" });
    }


    const { firstName, lastName, email, password } = req.body;

    const userExists = await user.findOne({ email: email });


    if (userExists) {
        res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new user({
        firstName,
        lastName,
        email,
        password: hashedPassword
    })
    await newUser.save();


    const userId = newUser._id;

    const token = jwt.sign({ userId }, JWT_SECRET);

    //linking and creating assosciated money account for new user

    const newUserAccount = new moneyAccountSchema({
        userId: userId,
        balance: ((1 * Math.random() * 1000).toFixed(2))      //

    })
    await newUserAccount.save();

    res.status(201).json({ message: "User registered successfully", token: token });

}



module.exports = {
    signInValidator,
    signUpValidator
};