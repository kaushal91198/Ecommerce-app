const asyncHandler = require("express-async-handler"); // it used as alternate functionality of try catch block
const Order = require("../models/OrderModel");

const orderController = () => {
  return {
    addOrderItem: asyncHandler(async (req, res) => {
      const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      } = req.body;
      if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error("No Order Found");
        return;
      } else {
        const order = {
          orderItmes: orderItems,
          User: req.user._id,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        };

        const createOrder = await Order.create(order);
        res.status(201).json(createOrder);
      }
    }),
    getOrderById: asyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id).populate(
        "User",
        "name email"
      );
      if (order) {
        res.json(order);
      } else {
        res.status(400);
        throw new Error("Order Not Found");
      }
    }),
    updateOrderToPaid: asyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id);
      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResults = {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
          email_address: req.body.email_address,
        };
        const updateOrder = await order.save();
        res.json(updateOrder);
      } else {
        res.status(404);
        throw new Error("Order not found.");
      }
    }),
    getMyOrders: asyncHandler(async (req, res) => {
      const orders = await Order.find({ user: req.user._id });
      res.json(orders);
    }),
  };
};

module.exports = orderController;
