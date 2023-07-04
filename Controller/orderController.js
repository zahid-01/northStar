const stripe = require("stripe");

const Orders = require("../Model/orderModel");
const Product = require("../Model/productsModel");

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
  const status = req.params.status;

  const orders = await Orders.find({ status });

  sendResponse(res, orders, 200);
});

exports.myOrders = catchAsync(async (req, res) => {
  const orders = await Orders.find({ customer: req.user.id });

  sendResponse(res, orders, 200);
});

exports.getCheckoutSession = catchAsync(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const myStripe = stripe(process.env.STRIPE_SECRET);

  const session = await myStripe.checkout.sessions.create({
    payment_method_types: ["card"],

    success_url: `${req.protocol}://${req.get("host")}/myOrders`,

    cancel_url: `${req.protocol}://${req.get("host")}`,
    customer_email: req.user.email,

    line_items: [
      {
        price_data: {
          currency: "inr",
          unit_amount: product.productPrice,
          product_data: {
            name: `${product.productName} Tour`,
            description: product.productDescription,
            images: [
              // `${req.protocol}://${req.get("host")}/img/${product.images[0]}`,
              `https://zany-gray-basket-clam-sari.cyclic.app/img/products/${product.productCode}-0.jpeg`,
            ],
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
  });

  res.status(200).json({
    status: "Success",
    session,
  });
});
