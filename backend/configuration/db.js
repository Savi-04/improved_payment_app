const mongoose = require("mongoose");

async function Connect_db() {
  const mongo_url = process.env.mongo_url;
  if (!mongo_url) {
    throw new Error("mongo_url environment variable is not set");
  }
  await mongoose.connect(mongo_url);
}

module.exports = Connect_db;