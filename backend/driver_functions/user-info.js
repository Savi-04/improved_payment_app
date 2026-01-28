const mongoose = require("mongoose");
const user = require("../configuration/userModel");
const account = require("../configuration/moneyAccountsSchema");

async function userInfo(req, res){
    try{
        const userId = req.userId;
        const userInfo = await user.findOne({_id : userId}).lean();
        const balanceInfo = await account.findOne({userId: userId}).select("balance").lean();
        const {password, ...otherDetails} = userInfo; //separating password from other details
       
       
        console.log(otherDetails, balanceInfo);
       
        res.status(200).json({otherDetails: otherDetails, balance: balanceInfo});
    }
    catch(err){
        res.status(500).json(err);
    }
}
module.exports = {userInfo};   