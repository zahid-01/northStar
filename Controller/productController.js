const Product = require("../Model/productsModel");

const {
  createOne,
  readAll,
  readOne,
  deleteOne,
  updateOne,
} = require("./handlerFactory");

exports.addProduct = createOne(Product);
exports.deleteProduct = deleteOne(Product);
exports.updateProduct = updateOne(Product);
exports.getProduct = readOne(Product);
exports.getAllProducts = readAll(Product);
