const express = require("express");
const Auth = require("../middleware/auth");
const {
  Getuserposts,
  Getallpost,
  LikeDislike,
  Addcomments,
  Deletecomment,
} = require("../controller/post");
const route = express.Router();
route.get("/all", Auth, Getallpost);
route.get("/:userid", Auth, Getuserposts);

route.patch("/:postid", Auth, LikeDislike);

route.patch("/comment/:postid", Auth, Addcomments);
route.patch("/delcomment/:postid/:commentid", Auth, Deletecomment);

module.exports = route;
