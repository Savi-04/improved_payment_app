const express = require("express");
const moneyAccountSchema = require("../configuration/moneyAccountsSchema");

//function to get the account balance of a user


async function getBalanceInfo(req, res){
    const userId = req.userId;
   const balance = await moneyAccountSchema.findOne({ userId: userId }).select("balance").lean();
   if(!balance){
    return res.status(404).json({message: "Account not found"});
   }
   return res.status(200).json(balance);
        

     


}

module.exports = {
    getBalanceInfo
};