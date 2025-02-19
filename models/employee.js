const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Employee = sequelize.define(
  "Employee",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(320),
      unique: true,
    },
    phone_number: {
      type: DataTypes.STRING(15),
      unique: true,
    },
  },
  {
    tableName: "employees",
    timestamps: false,
  }
);

module.exports = Employee;
