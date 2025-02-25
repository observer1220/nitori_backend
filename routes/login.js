const express = require("express");
const Employee = require("../models/EmployeeModel");
const router = express.Router();
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10; // 定義加密強度

// Employee Login
router.post("/", async (req, res) => {
  try {
    // 先根據 name 查詢 employee
    const employee = await Employee.findOne({
      where: { name: req.body.name },
    });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found!" });
    }

    // 驗證密碼
    const isMatch = await bcrypt.compare(req.body.passwd, employee.passwd);
    if (!isMatch) {
      return res.status(401).json({ error: "密碼錯誤" });
    }

    // 如果密碼正確，回傳使用者資訊(不包含密碼)
    res.json({
      id: employee.id,
      name: employee.name,
      position: employee.position,
      warehouse_id: employee.warehouse_id,
    });
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
