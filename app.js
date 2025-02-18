// app.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");

const productRouter = require("./routes/product");
const categoryRouter = require("./routes/category");
const supplierRouter = require("./routes/supplier");
const warehouseRouter = require("./routes/warehouse");
const customerRouter = require("./routes/customer");

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5173/",
      "http://64.176.37.84",
      "http://64.176.37.84/",
    ], // 允許的前端域名
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 連接資料庫
sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

// 同步模型
sequelize.sync();

// Create 產品
app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/suppliers", supplierRouter);
app.use("/warehouse", warehouseRouter);
app.use("/customers", customerRouter);

// 啟動伺服器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
