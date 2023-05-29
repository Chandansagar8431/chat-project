const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
      max: 8,
    },
    picturepath: {
      type: String,
      default: "",
    },
    location: String,
    occupation: String,
    friends: {
      type: Array,
      default: [],
    },
    viewdprofiles: Number,
    impressions: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
