const express = require("express");
const user = require("../configuration/userModel");

const zod = require("zod");


async function updateUserInfo(req, res){

    const udpateSchema = zod.object({
        firstName: zod.string().optional(),
        lastName: zod.string().optional(),
        password: zod.string().optional()


    })

    const validationResult = udpateSchema.safeParse(req.body);

    if(!validationResult.success){
        return res.status(400).json({message: "Invalid input data"});
    }

    await user.updateOne({_id: req.userId}, {$set: req.body})


    res.status(200).json({message: "User info updated successfully"});

}


module.exports = {
    updateUserInfo
};