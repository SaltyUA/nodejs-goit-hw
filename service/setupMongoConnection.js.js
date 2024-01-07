const mongoose = require("mongoose");

const { DB_MONGO_HOST } = require("../helpers/env");

const setupMongoConnection = async () => {
  try {
    await mongoose.connect(DB_MONGO_HOST);
    console.log("Database connection successful.");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = setupMongoConnection;
