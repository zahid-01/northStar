const productRouter = require("express").Router();

const { protect } = require("../Controller/authController");

const {
  addProduct,
  deleteProduct,
  updateProduct,
  getProduct,
  getAllProducts,
  uploadPhoto,
  resizePhoto,
} = require("../Controller/productController");

productRouter
  .route("/:id")
  .get(getProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

productRouter.use(protect);

productRouter.post("/add", uploadPhoto, resizePhoto, addProduct);

productRouter.get("/", getAllProducts);

module.exports = productRouter;
