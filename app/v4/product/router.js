const {
  createProduct,
  getProduct,
  getOneProduct,
  updateProduct,
  deleteProduct,
} = require("./controller");
const router = require("express").Router();

router.get("/products", getProduct);
router.get("/products/:id", getOneProduct);
router.post("/products", createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

module.exports = router;
