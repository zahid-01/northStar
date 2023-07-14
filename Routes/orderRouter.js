const orderRouter = require("express").Router();

const { protect } = require("../Controller/authController");
const {
  newOrder,
  allOrders,
  myOrders,
  getCheckoutSession,
  callbackUrl,
} = require("../Controller/orderController");

orderRouter.post("/callBackUrl", callbackUrl);

orderRouter.use(protect);

orderRouter.route("/add").post(newOrder);
orderRouter.get("/all/:status", allOrders);
orderRouter.get("/myOrders", myOrders);
orderRouter.get("/get-checkout-session/:id", getCheckoutSession);

module.exports = orderRouter;
