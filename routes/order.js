const express = require("express");
const Order = require("../models/OrderModel");
const router = express.Router();

// Create Order
router.post("/", async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read All Orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Order
router.put("/:id", async (req, res) => {
  try {
    const [updated] = await Order.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedOrder = await Order.findByPk(req.params.id);
      res.json(updatedOrder);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Order
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Order.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
