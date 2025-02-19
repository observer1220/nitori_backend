const express = require("express");
const { Employee } = require("../models");
const router = express.Router();

// Create Employee
router.post("/", async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read All Employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Edit Employee
router.put("/:id", async (req, res) => {
  try {
    await Employee.update(req.body, {
      where: { id: req.params.id },
    });
    res.json({ message: "Employee updated!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Employee
router.delete("/:id", async (req, res) => {
  try {
    await Employee.destroy({
      where: { id: req.params.id },
    });
    res.json({ message: "Employee deleted!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
