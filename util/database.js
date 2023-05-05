const Sequelize = require("sequelize");
const sequelize = new Sequelize("expense-data", "root", "Siba@2518", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
