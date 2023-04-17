const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads" });

const {
  getProducts,
  getOneProducts,
  createProduct,
  updateProduct,
  deleteProducts,
} = require("./controller");

router.get("/products", getProducts);
router.get("/products/:id", getOneProducts);
router.post("/products", upload.single("image"), createProduct);
router.put("/products/:id", upload.single("image"), updateProduct);
router.delete("/products/:id", deleteProducts);

module.exports = router;
