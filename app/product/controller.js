const connection = require("../../config/mysql");
const fs = require("fs");
const path = require("path");

const response = (res) => {
  return (error, result) => {
    if (error) {
      res.send({
        status: "failed",
        response: error,
      });
    } else {
      res.send({
        status: "success",
        response: result,
      });
    }
  };
};

const createProduct = (req, res, next) => {
  const { id, name, price, stock } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    connection.query(
      {
        sql: "INSERT INTO products (id, name, price, stock, image) VALUES (?,?,?,?,?)",
        values: [
          id,
          name,
          price,
          stock,
          `http://localhost:3000/public/${image.originalname}`,
        ],
      },
      response(res)
    );
  } else {
    console.log("Gambar harus diisi");
  }
};

const updateProduct = (req, res, next) => {
  const { name, price, stock } = req.body;
  const image = req.file;
  let sql = "";
  let values = [];
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    sql =
      "UPDATE products SET  name = ?, price = ?, stock = ?, image = ? WHERE id = ?";
    values = [
      name,
      price,
      stock,
      `http://localhost:3000/public/${image.originalname}`,
      req.params.id,
    ];
  } else {
    sql = "UPDATE products SET name = ?, price = ?, stock = ? WHERE id = ?";
    values = [name, price, stock, req.params.id];
  }
  connection.query({ sql, values }, response(res));
};

const getProducts = (req, res, next) => {
  const { search } = req.query;
  let result = {};
  if (search) {
    result = {
      sql: "SELECT * FROM products WHERE name LIKE ?",
      values: [`%${search}%`],
    };
  } else {
    result = { sql: "SELECT * FROM products " };
  }

  connection.query(result, response(res));
};

const getOneProducts = (req, res, next) => {
  connection.query(
    {
      sql: "SELECT * FROM products WHERE id = ?",
      values: req.params.id,
    },
    response(res)
  );
};

const deleteProducts = (req, res, next) => {
  connection.query(
    {
      sql: "DELETE FROM products WHERE id = ?",
      values: req.params.id,
    },
    response(res)
  );
};

module.exports = {
  getProducts,
  getOneProducts,
  createProduct,
  updateProduct,
  deleteProducts,
};
