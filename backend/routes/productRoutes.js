const express = require("express");
const Router = express.Router();
const productController = require('../controller/productController')
const authMiddleware =require('../middleware/authMiddleware')


//Route:1->Get all product
Router.get(
  "/products",productController().allProducts
);

//Route:->Get single product
Router.get(
  "/products/:id",productController().singleProduct

);

module.exports = Router;
