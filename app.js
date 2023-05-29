const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const appError = require("./Utilities/error");
const userRouter = require("./Routes/userRouter");
const errorController = require("./Controller/errorController");

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/user", userRouter);

app.all("*", (_, __, next) => {
  next(new appError(404, "No page with this URL found on this server"));
});

app.use(errorController);

module.exports = app;
