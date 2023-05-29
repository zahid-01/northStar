const app = require("./app");
const config = require("dotenv").config({ path: "./config.env" });
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connection successful"));

app.listen(5000, () => {
  console.log("App running");
});
