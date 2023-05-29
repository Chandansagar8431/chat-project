const mongoose = require("mongoose");
require("dotenv").config();

const Connect = async () => {
  try {
    await mongoose.connect(process.env.MONGOURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db connevted");
  } catch (error) {
    console.log(error);
  }
};

module.exports = Connect;
