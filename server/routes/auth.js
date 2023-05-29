const express = require("express");
const Auth = require("../middleware/auth");
const { Login } = require("../controller/auth");
const route = express.Router();

route.post("/login", Login);

module.exports = route;
