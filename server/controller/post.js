const mongoose = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");

const Createpost = async (req, res) => {
  try {
    const { userid, description, picturepath } = req.body;
    const user = await User.findById(userid);
    const post = new Post({
      userid,
      description,
      firstname: user.firstname,
      lastname: user.lastname,
      userpicturepath: user.picturepath,
      picturepath,
      occupation: user.occupation,
      location: user.location,
      likes: {},
      comments: [],
    });

    await post.save();
    const allposts = await Post.find();
    res.status(200).json(allposts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const Getuserposts = async (req, res) => {
  try {
    const { userid } = req.params;
    const userposts = await Post.find({ userid });
    res.status(200).json(userposts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const Getallpost = async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const LikeDislike = async (req, res) => {
  try {
    const { userid } = req.body;
    const { postid } = req.params;
    const post = await Post.findById(postid);

    const isliked = post.likes.get(userid);
    if (isliked) {
      post.likes.delete(userid);
    } else {
      post.likes.set(userid, true);
    }

    const updatedpost = await Post.findByIdAndUpdate(
      postid,
      { likes: post.likes },
      { new: true }
    );
    res.status(200).json(updatedpost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = { Createpost, Getuserposts, LikeDislike, Getallpost };
