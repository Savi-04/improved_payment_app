const mongoose = require("mongoose");

const moneyAccountSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', required: true },
    balance: { type: Number, 
        required: true,
         default: 0 }})

module.exports = mongoose.model("MoneyAccount", moneyAccountSchema);