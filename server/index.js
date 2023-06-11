const express = require("express");
const Connect = require("./dbconnect/connect");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
const { fileURLToPath } = require("url");
const { Register } = require("./controller/auth");
const AuthRoutes = require("./routes/auth");
const { Createpost } = require("./controller/post");
const User = require("./models/User");
const Post = require("./models/Post");

const { users, posts } = require("./data/data.js");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

const direcpath = path.join(__dirname, "public/assets");
app.use("/assets", express.static(direcpath));
const PORT = process.env.PORT || 4000;

/* storage and upload congifs*/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
Connect();

// const insert = async () => {
//   await User.insertMany(users);
//   await Post.insertMany(posts);
// };
// insert();

app.post("/auth/register", upload.single("picturepath"), Register);
app.post("/post", upload.single("picture"), Createpost);
app.use("/auth", AuthRoutes);
app.use("/user", require("./routes/users"));
app.use("/post", require("./routes/post"));
app.listen(PORT, () => {
  console.log("server started at", PORT);
});
