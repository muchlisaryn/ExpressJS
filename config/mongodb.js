const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

(async () => {
  try {
    await client.connect();
    console.log(`Koneksi berhasil`);
  } catch (e) {
    console.log(e);
  }
})();

const db = client.db("electronic_store");

module.exports = db;
