const express = require("express");
const mongoose = require("mongoose");
const moneyAccountSchema = require("../configuration/moneyAccountsSchema");



async function transfer(req, res){

    const session = await mongoose.startSession();

    session.startTransaction();

    const { toAccountId, amount, userId} = req.body;

    //no checks for account Id is required because front end will provided only valid account Ids


    const beneficiaryAccount = await moneyAccountSchema.findOne({userId: toAccountId}).session(session);
    


    

    const senderAccount = await moneyAccountSchema.findOne({ userId: userId }).session(session);

    if(amount > senderAccount.balance){
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({message: "Insufficient balance"});
    }
    
await moneyAccountSchema.updateOne(
    { userId: senderAccount.userId },
    { $inc: { balance: -amount } }
).session(session);


await moneyAccountSchema.updateOne(
    { userId: beneficiaryAccount.userId },
    { $inc: { balance: amount } }
).session(session);

await session.commitTransaction();

console.log("Transfer successful");
res.status(200).json({message: "Transfer successful"});
session.endSession();








}

module.exports = {
    transfer
};