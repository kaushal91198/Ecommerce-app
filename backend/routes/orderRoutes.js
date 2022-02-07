const express = require("express");
const Router = express.Router();
const orderController = require('../controller/orderController')
const authMiddleware =require('../middleware/authMiddleware')


//Route:1->Get all product
Router.post(
  "/orders",authMiddleware,orderController().addOrderItem
);
//Route:2->Get One Product by id
Router.get(
  "/orders/:id",authMiddleware,orderController().getOrderById
);
//Route:3->Update Order details (paid)
Router.put(
  "/orders/:id/pay",authMiddleware,orderController().updateOrderToPaid
);
//Route:4->Get user orders
Router.get(
  "/myorders",authMiddleware,orderController().getMyOrders
);

module.exports = Router;
