const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var connection = mongoose.connection;
connection.on("error", () => {
  console.log("MongoDB Connection failed.");
});

connection.on("connected", () => {
  console.log("MongoDB Connection successful");
});

module.exports = mongoose;
