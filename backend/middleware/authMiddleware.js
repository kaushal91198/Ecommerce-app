const jwt = require("jsonwebtoken");
const env = require("dotenv");
const userModel = require('../models/User')
env.config();
const authMiddleware = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      let token = req.headers.authorization.split(" ")[1];
      // console.log(token)
      const data = jwt.verify(token, process.env.JWT_KEY);
      const userData = await userModel.findById(data._id)
    //   console.log(userData)
      req.user = userData
      next();
    } catch (error) {
      res
        .status(401)
        .json({ message: "Please authenticate using valid token" });
    }
  } else {
    res.status(401).json({ message: "Please authenticate using valid token" });
  }
};

module.exports = authMiddleware;
