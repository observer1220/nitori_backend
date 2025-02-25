const express = require("express");
const Employee = require("../models/EmployeeModel");
const router = express.Router();
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10; // 定義加密強度

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

// Change Password
router.put("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found!" });
    }

    // 先檢查是否有傳入 passwd，避免不必要的加密
    let updatedData = { ...req.body };
    if (req.body.passwd) {
      const hashedPassword = await bcrypt.hash(req.body.passwd, SALT_ROUNDS);
      updatedData.passwd = hashedPassword;
    }

    await employee.update(updatedData);
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
