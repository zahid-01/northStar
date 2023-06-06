const Orders = require("../Model/orderModel");

const { catchAsync } = require("../Utilities/catchAsync");

const sendResponse = (res, data, statusCode) => {
  res.status(statusCode).json({
    status: "Success",
    count: data.length,
    data,
  });
};

exports.newOrder = catchAsync(async (req, res) => {
  req.body.customer = req.user;

  const order = await Orders.create(req.body);

  sendResponse(res, order, 200);
});

exports.allOrders = catchAsync(async (req, res) => {
  const orders = await Orders.find();

  sendResponse(res, orders, 200);
});

exports.myOrders = catchAsync(async (req, res) => {
  const orders = await Orders.find({ customer: req.user.id });

  sendResponse(res, orders, 200);
});
