const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Register = async (req, res) => {
  try {
    console.log(req.body);
    const {
      firstname,
      lastname,
      email,
      password,
      occupation,
      location,
      picturepath,
      friends,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);
    const user = new User({
      firstname,
      lastname,
      email,
      password: hashpassword,
      occupation,
      location,
      picturepath,
      friends,
      impressions: Math.floor(Math.random() * 1000),
      viewdprofiles: Math.floor(Math.random() * 1000),
    });
    const saveduser = await user.save();
    res.status(201).json(user);
    console.log(saveduser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).send("user not exits");
    }
    const ismatch = await bcrypt.compare(password, user.password);
    delete user.password;
    if (ismatch) {
      const token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: 3600,
      });
      return res.status(200).json({ token, user });
    }
    res.status(402).json({ msg: "password ot matchded" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = { Register, Login };
