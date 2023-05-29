const express = require("express");
const Auth = require("../middleware/auth");
const { Getuserposts, Getallpost, LikeDislike } = require("../controller/post");
const route = express.Router();
route.get("/all", Auth, Getallpost);
route.get("/:userid", Auth, Getuserposts);

route.patch("/:postid", Auth, LikeDislike);

module.exports = route;
