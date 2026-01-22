const express = require("express");
const moneyAccountSchema = require("../configuration/moneyAccountsSchema");

//function to get the account balance of a user


function getBalanceInfo(req, res){
    const { userId } = req;
    moneyAccountSchema.findOne({ userId: userId }, (err, account) => {
        if(err){
            return res.status(500).json({message: "Error fetching account balance"});
        }
        if(!account){
            return res.status(404).json({message: "Account not found"});
        }

        res.status(200).json({ balance: account.balance });
    }
    )


}

module.exports = {
    getBalanceInfo
};