const express = require("express");
const route = express.Router();
const Auth = require("../middleware/auth");
const {
  Getallusers,
  Getuser,
  Getuserfriends,
  AddRemovefreinds,
} = require("../controller/users");

route.get("/users", Auth, Getallusers);
route.get("/:id", Auth, Getuser);
route.get("/friends/:id", Auth, Getuserfriends);
route.patch("/:id/:friendid", Auth, AddRemovefreinds);
module.exports = route;
