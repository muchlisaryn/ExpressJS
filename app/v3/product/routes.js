const router = require("express").Router();
const multer = require("multer");
const { getData, getOneData, createData, deleteData } = require("./controller");
const upload = multer({ dest: "uploads" });

router.get("/products", getData);
router.get("/products/:id", getOneData);
router.post("/products", createData);
router.delete("/products/:id", deleteData);

module.exports = router;
