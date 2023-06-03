const jwt = require("jsonwebtoken");
const User = require("../Model/userModel");
const { catchAsync } = require("../Utilities/catchAsync");
const AppError = require("../Utilities/error");

const sendAuthResponse = (res, user, message, token) => {
  const userData = {
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    id: user._id,
  };

  res.status(200).json({
    status: "Success",
    message,
    userData,
    token,
  });
};

const createSendToken = ({ _id }, res) => {
  const cookie = jwt.sign({ data: _id }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });

  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 60),
    secure: true,
    httpOnly: false,
  };

  res.cookie("JWT", cookie, cookieOptions);
  return cookie;
};

exports.signUp = catchAsync(async (req, res) => {
  const user = await User.create(req.body);

  const token = createSendToken(user, res);

  sendAuthResponse(res, user, "Account created successfully", token);
});

exports.login = catchAsync(async (req, res, next) => {
  if (!req.body.email || !req.body.password)
    return next(new AppError(400, "Enter email and password"));

  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new AppError(203, "No user with that email found"));
  }

  const match = await user.checkPassword(password, user.password);

  if (!match) return next(new AppError(203, "Invalid credentials"));

  const token = createSendToken(user, res);

  sendAuthResponse(res, user, "Logged In successfully", token);
});

exports.protect = catchAsync(async (req, res, next) => {
  // console.log(req.headers.authorization);
  next();
});