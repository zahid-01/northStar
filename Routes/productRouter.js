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

productRouter.use(protect);

productRouter
  .route("/:id")
  .get(getProduct)
  .patch(uploadPhoto, resizePhoto, updateProduct)
  .delete(deleteProduct);

productRouter.post("/add", uploadPhoto, resizePhoto, addProduct);

productRouter.get("/", getAllProducts);

module.exports = productRouter;
