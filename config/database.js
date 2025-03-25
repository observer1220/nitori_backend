// config/database.js
const { Sequelize } = require("sequelize");

// 使用 Docker Volume
const sequelize = new Sequelize(process.env.DB_SOURCE, {
  dialect: "postgres",
  logging: (msg, time) => {
    // 只記錄超過 1 秒的查詢
    if (time > 1000) {
      console.log(`[Sequelize] Slow Query (${time}ms): ${msg}`);
    }
  },
  pool: {
    max: 5, // 最大連線數
    min: 1, // 最小連線數
    acquire: 30000, // 30 秒內未獲得連線則報錯
    idle: 10000, // 10 秒內無使用則釋放
  },
});

// 使用本地端資料庫
// const sequelize = new Sequelize("nitori", "root", "test1234", {
//   host: "localhost",
//   dialect: "postgres",
// });

module.exports = sequelize;
