const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Warehouse = sequelize.define(
  "Warehouse",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "warehouses",
    timestamps: false,
  }
);

module.exports = Warehouse;
