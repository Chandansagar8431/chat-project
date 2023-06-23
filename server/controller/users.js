const mongoose = require("mongoose");
const User = require("../models/User");

const Getallusers = async (req, res) => {
  try {
    let users = await User.find();
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const Getuser = async (req, res) => {
  try {
    const userid = req.user.id;
    console.log(userid);
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      return res.status(200).json(user);
    } else {
      res.status(404).json({ msg: "user not found" });
    }
  } catch (error) {
    res.status(500).send("serverside error");
  }
};
const Getuserfriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    let userfriends = await Promise.all(
      user.friends.map((friend) => User.findById(friend))
    );
    console.log(userfriends);
    if (userfriends) {
      const userfriendsList = userfriends.map(
        ({ firstname, lastname, location, occupation, picturepath, _id }) => {
          return {
            firstname,
            lastname,
            location,
            occupation,
            picturepath,
            _id,
          };
        }
      );
      return res.status(200).json(userfriendsList);
    }

    res.status(404).json({ msg: "no friends found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const AddRemovefreinds = async (req, res) => {
  try {
    const { id, friendid } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendid);
    if (id === friendid) {
      return res.status(200).json([]);
    } else if (user.friends.includes(friendid)) {
      user.friends = user.friends.filter((id) => id !== friendid);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendid);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();
    const friendlist = await Promise.all(
      user.friends.map((friendid) => User.findById(friendid))
    );
    const friendsdata = friendlist.map(
      ({ firstname, lastname, occupation, location, picturepath, _id }) => {
        return {
          firstname,
          lastname,
          occupation,
          location,
          picturepath,
          _id,
        };
      }
    );
    res.status(200).json(friendsdata);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = { Getallusers, Getuser, Getuserfriends, AddRemovefreinds };
