const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017")
  .then((ressponse) => console.log(`Berhasil terhubung`))
  .catch((err) => console.log(err));
