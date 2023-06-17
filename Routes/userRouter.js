const userRouter = require("express").Router();
const { signUp, login, isLoggedIn } = require("../Controller/authController");

userRouter.get("/isLoggedIn", isLoggedIn);
userRouter.post("/signUp", signUp);
userRouter.post("/login", login);

module.exports = userRouter;
