const userModel = require("../models/User");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
// const { validationResult } = require("express-validator");
const env = require("dotenv");
env.config();
const userController = () => {
  return {
    userDetails:asyncHandler(async (req, res) => {
      const user = await userModel.findById(req.user._id);
      const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
      if (user) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token:token
        });
      } else {
        res.status(404);
        return res.json({ message: "Internal Server Error" });
      }}),
    userLogin: asyncHandler(async (req, res) => {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //   return res.status(400).json({ errors: errors.array() });
        // }
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });
      if (user && (await user.matchPassword(password))) {
        // if(user && (await userModel.matchPassword(password,user.password) )){
        const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: token,
        });
      } else {
        return res.json({ message: "Please login with correct credentials" });
      }
    }),
    userSignup: asyncHandler(async (req, res) => {
      const { name, email, password } = req.body;
      const userExist = await userModel.findOne({ email });
      if (userExist) {
        return res
          .status(400)
          .json({ message: "Please register with another email" });
      }
      const user = await userModel.create({
        name,
        email,
        password,
      });
      if (user) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        });
      } else {
        return res.status(400).json({ message: "Internal Server error." });
      }
    }),
    updateUserProfile: asyncHandler(async (req, res) => {
      const user = await userModel.findById(req.user._id)
      if (user) {
        (user.name = req.body.name || user.name),
          (user.email = req.body.email || user.email);
        if (req.body.password) {
          user.password = req.body.password;
        }
        const updateUser = await user.save();
        const token = jwt.sign({ _id: updateUser._id }, process.env.JWT_KEY);
        return res.json({
          _id:  updateUser._id,
          name:  updateUser.name,
          email:  updateUser.email,
          isAdmin:  updateUser.isAdmin,
          token: token,
        });
      }
      else{
        res.status.json({ message: "User not Found." })
      }
    }),
  };
};

module.exports = userController;
