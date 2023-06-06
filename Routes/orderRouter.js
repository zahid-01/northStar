const orderRouter = require("express").Router();

const { protect } = require("../Controller/authController");
const {
  newOrder,
  allOrders,
  myOrders,
} = require("../Controller/orderController");

orderRouter.use(protect);

orderRouter.route("/add").post(newOrder);
orderRouter.get("/all", allOrders);
orderRouter.get("/myOrders", myOrders);

module.exports = orderRouter;
