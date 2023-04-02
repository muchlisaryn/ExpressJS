const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads" });
const fs = require("fs");
const path = require("path");

router.get("/", (req, res, next) => {
  const { page, total } = req.query;
  res.json({
    status: "Succesfully",
    message: "wellcome to express ",
    page,
    total,
  });
});

router.get("/user/:id", (req, res, next) => {
  console.log(req.params);
  res.json({
    id: req.params.id,
    name: "Muchlis",
    age: 22,
  });
});

router.post("/register", upload.single("image"), (req, res, next) => {
  const { name, age, gender } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "uploads", image.originalname);
    fs.renameSync(image.path, target);
    res.json({ name, age, gender, image });
  } else {
    console.log("Gambar harus diisi");
  }
});

module.exports = router;
