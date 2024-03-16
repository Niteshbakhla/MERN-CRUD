const mongoose = require("mongoose");

const connedDB = async () => {
  try {
    const url = `mongodb://localhost:27017/bloggingApp`;
    await mongoose.connect(url);
    console.log("connected to mongodb");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connedDB;
