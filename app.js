const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const appError = require("./Utilities/error");
const errorController = require("./Controller/errorController");

const userRouter = require("./Routes/userRouter");
const productRouter = require("./Routes/productRouter");
const orderRouter = require("./Routes/orderRouter");

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://nsjk.netlify.app/",
      "https://north-star-frontend.vercel.app",
    ],
    credentials: true,
  })
);
app.options("*", cors());
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", userRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);

app.all("*", (_, __, next) => {
  next(new appError(404, "No page with this URL found on this server"));
});

app.use(errorController);

module.exports = app;
