
const mongoose = require("mongoose");

require('dotenv').config();

const mongo_url = process.env.mongo_url;
async function Connect_db() {
   await mongoose.connect(mongo_url);
   console.log("Database connected successfully");

}

module.exports = Connect_db;