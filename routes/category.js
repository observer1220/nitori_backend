const express = require("express");
const { Category } = require("../models");
const router = express.Router();

// Create Categories
router.post("/categories", async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
