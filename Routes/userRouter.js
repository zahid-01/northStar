const userRouter = require("express").Router();
const { signUp, login } = require("../Controller/authController");

userRouter.post("/signUp", signUp);
userRouter.post("/login", login);

module.exports = userRouter;
