const Product = require("./model");

const getProduct = async (req, res, next) => {
  try {
    const result = await Product.find();
    res.status(200).send({
      status: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getOneProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Product.findOne({ _id: id });

    if (!result) {
      return res.status(400).send({
        status: "failed",
        message: `id product ${id} tidak ditemukan`,
      });
    }

    res.status(200).send({
      status: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  const { name, price, stock } = req.body;
  try {
    const result = await Product.create({
      name,
      price,
      stock,
    });
    res.status(201).send({
      status: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, price, stock, status } = req.body;

  try {
    const findData = await Product.findOne({ _id: id });

    if (!findData) {
      return res.status(400).send({
        status: "failed",
        message: `id product ${id} tidak ditemukan`,
      });
    }

    const result = await Product.findOneAndUpdate(
      { _id: id },
      {
        name,
        price,
        stock,
        status: stock === 0 ? false : status,
      },
      { new: true, runValidators: true }
    );
    res.status(200).send({
      status: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const findData = await Product.findOne({ _id: id });

    if (!findData) {
      return res.status(400).send({
        status: "failed",
        message: `id product ${id} tidak ditemukan`,
      });
    }

    const result = await Product.deleteOne();
    res.status(200).send({
      status: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getProduct,
  getOneProduct,
  deleteProduct,
  updateProduct,
};
