const mongoose = require("mongoose");

async function connectToMongo() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Blogapp");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit with failure
  }
}

module.exports = connectToMongo;
