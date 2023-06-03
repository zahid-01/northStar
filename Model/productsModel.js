const mongoose = require("mongoose");

const ProductsSchema = mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Provide a product name"],
  },
  productDescription: {
    type: String,
    required: [true, "Provide a product description"],
  },
  productPrice: {
    type: Number,
    required: [true, "Provide a product price"],
  },
  productCode: {
    required: [true, "Provide a product code"],
    type: String,
    unique: [true, "Product exists"],
  },
  images: {
    type: [String],
    default: "default.jpg",
  },
});

const Product = new mongoose.model("products", ProductsSchema);
module.exports = Product;
