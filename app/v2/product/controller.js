const path = require("path");
const fs = require("fs");
const Product = require("./model");
const { where } = require("sequelize");

const getProduct = async (req, res, next) => {
  try {
    const result = await Product.findAll();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

const getOneProducts = async (req, res, next) => {
  const { product_id } = req.params;
  const find = await Product.findOne({ where: { product_id } });

  if (find) {
    res.send(find.dataValues);
  } else {
    res.send(`id ${product_id} tidak ditemukan`);
  }
};

const updateProduct = async (req, res, next) => {
  const { product_id } = req.params;
  const { name, price, stock, status } = req.body;
  const image = req.file;
  const findData = await Product.findOne({ where: { product_id } });

  if (!findData) {
    return res.send(`id ${product_id} tidak ditemukan`);
  }

  if (image) {
    const target = path.join(__dirname, "../../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    try {
      await findData.update(
        {
          product_id,
          name,
          price,
          stock,
          status,
          image: `http://localhost:3000/public/${image.originalname}`,
        },
        findData
      );
      res.send(`Data berhasil diubah`);
    } catch (error) {
      res.send(error);
    }
  } else {
    try {
      findData.update(
        {
          name,
          price,
          stock,
          status,
        },
        findData
      );
      res.send(`Data berhasil diubah`);
    } catch (error) {
      res.send(error);
    }
  }
};

const createProduct = async (req, res, next) => {
  const { product_id, name, price, stock, status } = req.body;
  const image = req.file;

  console.log(product_id, name, price, stock, status, "image", image);

  if (image) {
    const target = path.join(__dirname, "../../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    try {
      await Product.sync();
      const result = await Product.create({
        product_id,
        name,
        price,
        stock,
        status,
        image: `http://localhost:3000/public/${image.originalname}`,
      });
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  } else {
    throw new Error("Image harus diisi");
  }
};

const deleteProduct = async (req, res, next) => {
  const { product_id } = req.params;
  try {
    const find = await Product.findOne({ product_id });
    console.log(product_id, "===", find.dataValues.product_id);
    const result = await find.destroy();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getProduct,
  getOneProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
