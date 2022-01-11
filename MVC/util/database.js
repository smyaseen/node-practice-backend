const Sequelize = require("sequelize");

exports.sequelize = new Sequelize("node-complete", "root", "adminadmin", {
  dialect: "mysql",
});
