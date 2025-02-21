const express = require("express");
const { Employee } = require("../models");
const router = express.Router();

// Employee Login
router.post("/", async (req, res) => {
  try {
    const employee = await Employee.findOne({
      where: {
        name: req.body.name,
        passwd: req.body.passwd,
      },
    });

    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ error: "Employee not found!" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
