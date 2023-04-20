const { ObjectId } = require("mongodb");
const db = require("../../../config/mongodb");

const getData = (req, res, next) => {
  db.collection("products")
    .find()
    .toArray()
    .then((result) => res.send(result))
    .catch((errro) => res.send(err));
};

const getOneData = (req, res, next) => {
  const { id } = req.params;
  db.collection("products")
    .findOne({ _id: new ObjectId(id) })
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

const createData = (req, res, next) => {
  const { name, price, stock } = req.body;
  const defaultStatus = true;
  console.log(name, price, stock);
  db.collection("products")
    .insertOne({ status: defaultStatus, stock, price, name })
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

const deleteData = (req, res, next) => {
  const { id } = req.params;
  db.collection("products")
    .deleteOne({ _id: new ObjectId(id) })
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

module.exports = { getData, getOneData, createData, deleteData };
