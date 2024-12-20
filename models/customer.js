const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Customer = sequelize.define(
  "Customer",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
    },
    email: {
      type: DataTypes.STRING(100),
    },
    password: {
      type: DataTypes.STRING(100),
    },
    phone: {
      type: DataTypes.STRING(100),
    },
    address: {
      type: DataTypes.STRING(100),
    },
  },
  {
    tableName: "customers",
    timestamps: false,
  }
);

module.exports = Customer;
