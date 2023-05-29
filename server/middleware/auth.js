const jwt = require("jsonwebtoken");
require("dotenv").config();

const Auth = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(402).send("access deneid");
    }

    if (token.startsWith("Bearer")) {
      token = token.slice(7, token.length);

      const verified = jwt.verify(token, process.env.SECRET);

      req.user = verified;
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send("not authoriged");
  }
};
module.exports = Auth;
