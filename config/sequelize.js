const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  database: "electronic_store_v2",
  host: "localhost",
  username: "root",
  password: "root",
  dialect: "mysql",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully");
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
