const express = require("express");
const jwtToken = require("jsonwebtoken");

// const { JWT_SECRET } = require("../configuration/config");

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

function jwtValidator(req, res, next){

    const jwtToken = req.headers.authorisation

    if(!jwtToken || !jwtToken.startsWith("Bearer ")){

        return res.status(402).json({message: "Unauthorized access"});  //want to verify something in signin logic that's why 402 used

    }
    
    const token = jwtToken.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);
    try {
        if(decoded.userId){
            req.userId = decoded.userId;
            next();
        }
        
    }catch(err){
        return res.status(401).json({message: "Unauthorized access"});
    }

}

module.exports = {
    jwtValidator
};