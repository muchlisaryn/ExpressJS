const path = require("path");
const fs = require("fs");
const Product = require("./model");
const { where } = require("sequelize");

const getProduct = async (req, res, next) => {
  try {
    const result = await Product.findAll();
    return res.status(200).send({
      status: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getOneProducts = async (req, res, next) => {
  const { product_id } = req.params;
  const find = await Product.findOne({ where: { product_id } });

  if (find) {
    return res.status(200).send({
      status: "success",
      data: find.dataValues,
    });
  } else {
    return res.status(400).send({
      status: "failed",
      message: `id ${product_id} tidak ditemukan`,
    });
  }
};

const updateProduct = async (req, res, next) => {
  const { product_id } = req.params;
  const { name, price, stock, status } = req.body;
  const image = req.file;
  const findData = await Product.findOne({ where: { product_id } });

  if (!findData) {
    res.status(400);
    return res.send({
      status: "failed",
      message: `id ${product_id} tidak ditemukan`,
    });
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
      res.status(200).send({
        status: "success",
        message: `Data berhasil diubah`,
      });
    } catch (error) {
      next(error);
    }
  } else {
    try {
      await findData.update(
        {
          name,
          price,
          stock,
          status,
        },
        findData
      );
      res.status(200).send({
        status: "success",
        message: `Data dengan id ${product_id} berhasil diubah`,
      });
    } catch (error) {
      next(error);
    }
  }
};

const createProduct = async (req, res, next) => {
  const { product_id, name, price, stock, status } = req.body;
  const image = req.file;

  const findData = await Product.findOne({ where: { product_id } });

  if (findData) {
    return res.status(400).send({
      status: "failed",
      message: `Product dengan id ${product_id} sudah ada`,
    });
  }

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
      res.status(201).send({
        status: "success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  } else {
    res.status(400).send({
      status: "failed",
      message: "Image wajib di upload",
    });
  }
};

const deleteProduct = async (req, res, next) => {
  const { product_id } = req.params;
  const find = await Product.findOne({ where: { product_id } });

  if (!find) {
    return res.status(400).send({
      status: "failed",
      message: `id ${product_id} tidak ditemukan`,
    });
  }

  try {
    await find.destroy();
    return res.status(200).send({
      status: "success",
      message: "Data berhasil di hapus",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProduct,
  getOneProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
