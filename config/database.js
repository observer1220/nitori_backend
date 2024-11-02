// config/database.js
const { Sequelize } = require("sequelize");

// 使用 Docker Volume
const sequelize = new Sequelize(process.env.DB_SOURCE);

// 使用本地端資料庫
// const sequelize = new Sequelize("nitori", "root", "test1234", {
//   host: "localhost",
//   dialect: "postgres",
// });

module.exports = sequelize;
