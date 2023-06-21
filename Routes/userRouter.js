const userRouter = require("express").Router();
const {
  signUp,
  login,
  isLoggedIn,
  logOut,
} = require("../Controller/authController");

userRouter.get("/isLoggedIn", isLoggedIn);
userRouter.get("/logout", logOut);
userRouter.post("/signUp", signUp);
userRouter.post("/login", login);

module.exports = userRouter;
