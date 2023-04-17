const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads" });
const {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getOneProducts,
} = require("./controller");

router.get("/products", getProduct);
router.get("/products/:product_id", getOneProducts);
router.post("/products", upload.single("image"), createProduct);
router.put("/products/:product_id", upload.single("image"), updateProduct);
router.delete("/products/:product_id", deleteProduct);

module.exports = router;
