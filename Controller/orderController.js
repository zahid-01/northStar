const axios = require("axios");
const crypto = require("crypto");

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
  const { productPrice, _id } = await Product.findById(req.params.id);
  const { phone } = req.user;

  const payOptions = {
    merchantId: "MERCHANTUAT",
    merchantTransactionId: "MT7850590068188104",
    merchantUserId: _id,
    amount: productPrice * 100,
    redirectUrl: "http://localhost:5000/orders/uiCallback",
    // redirectUrl: "https://webhook.site/ad89f810-68ac-4fe6-bcb7-3d42ad4906c1",
    redirectMode: "POST",
    callbackUrl: "http://localhost:5000/orders/callBackUrl",
    mobileNumber: phone,
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };

  const encodedPayload = btoa(JSON.stringify(payOptions));

  const hash = crypto
    .createHash("SHA-256")
    .update(encodedPayload + "/pg/v1/pay" + process.env.PHONEPE_SALT_KEY)
    .digest("hex");

  const checksumHeader = hash + "###" + process.env.PHONEPE_SALT_INDEX;

  const phonePeRes = await axios({
    method: "POST",
    url: " https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
    data: { request: encodedPayload },
    headers: {
      "X-VERIFY": checksumHeader,
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const { url } = phonePeRes.data.data.instrumentResponse.redirectInfo;

  res.status(200).json({
    status: "Success",
    url,
  });
});

exports.uiCallback = (req, res) => {
  console.log(req.body);
  res.redirect("http://localhost:3000/UICallback");
};

exports.callbackUrl = (req, res, next) => {
  console.log(req.body);
  next();
};
