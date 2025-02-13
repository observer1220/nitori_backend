// app.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Product = require("./models/product");
const Customer = require("./models/customer");
const sequelize = require("./config/database");

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
app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read 所有產品
app.get("/products", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read 單一產品
app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update 產品
app.put("/products/:id", async (req, res) => {
  try {
    const [updated] = await Product.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedProduct = await Product.findByPk(req.params.id);
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete 產品
app.delete("/products/:id", async (req, res) => {
  try {
    const deleted = await Product.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create Customer
// app.post("/customers", async (req, res) => {
//   try {
//     const customer = await Customer.create(req.body);
//     res.status(201).json(customer);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// Read All Customers
// app.get("/customers", async (req, res) => {
//   try {
//     const customers = await Customer.findAll();
//     res.json(customers);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// 啟動伺服器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
