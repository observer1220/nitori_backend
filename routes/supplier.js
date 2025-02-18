const express = require("express");
const { Supplier } = require("../models");
const router = express.Router();

// Create Supplier
router.post("/", async (req, res) => {
  try {
    const supplier = await Supplier.create(req.body);
    res.status(201).json(supplier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read All Suppliers
router.get("/", async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Supplier
router.put("/:id", async (req, res) => {
  try {
    const [updated] = await Supplier.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedSupplier = await Supplier.findByPk(req.params.id);
      res.json(updatedSupplier);
    } else {
      res.status(404).json({ error: "Supplier not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Supplier
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Supplier.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Supplier not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
