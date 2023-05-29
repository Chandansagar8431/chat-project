const mongoose = require("mongoose");

const Postschema = new mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      reuired: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: String,
    occupation: String,
    userpicturepath: String,
    picturepath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", Postschema);
module.exports = Post;
