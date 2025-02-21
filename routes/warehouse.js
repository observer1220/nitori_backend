const express = require("express");
const { Warehouse } = require("../models/WarehouseModel");
const router = express.Router();

// Create Warehouse
router.post("/", async (req, res) => {
  try {
    const warehouse = await Warehouse.create(req.body);
    res.status(201).json(warehouse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read All Warehouses
router.get("/", async (req, res) => {
  try {
    const warehouses = await Warehouse.findAll();
    res.json(warehouses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Warehouse
router.put("/:id", async (req, res) => {
  try {
    const [updated] = await Warehouse.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedWarehouse = await Warehouse.findByPk(req.params.id);
      res.json(updatedWarehouse);
    } else {
      res.status(404).json({ error: "Warehouse not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Warehouse
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Warehouse.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Warehouse not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
