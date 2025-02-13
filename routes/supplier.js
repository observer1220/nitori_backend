const express = require("express");
const { Supplier } = require("../models");
const router = express.Router();

// Create Supplier
router.post("/suppliers", async (req, res) => {
  try {
    const supplier = await Supplier.create(req.body);
    res.status(201).json(supplier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
