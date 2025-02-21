const express = require("express");
const { Employee } = require("../models/EmployeeModel");
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

// Change Name and Password: 待驗證
router.put("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (employee) {
      await employee.update({
        name: req.body.name,
        passwd: req.body.passwd,
      });
      res.json(employee);
    } else {
      res.status(404).json({ error: "Employee not found!" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
