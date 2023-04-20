const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, `nama product harus diisi`],
    minLength: 3,
  },
  price: {
    type: Number,
    required: [true, `price harus diisi`],
  },
  stock: {
    type: Number,
    required: [true, `price harus diisi`],
  },
  status: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
