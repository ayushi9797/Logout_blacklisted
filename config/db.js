const mongoose = require("mongoose");
require("dotenv").config();
const connections = mongoose.connect(process.env.mongo_url);
console.log("connected to mongodb database");

module.exports = {
  connections,
};
