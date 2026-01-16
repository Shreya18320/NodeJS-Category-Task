const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");



const Item = sequelize.define("items", {
  subcategory_id: DataTypes.INTEGER,
  name: DataTypes.STRING,
  price: DataTypes.FLOAT,
  rating: DataTypes.FLOAT,
  stock: DataTypes.INTEGER
}, {
  timestamps: false
});

module.exports = Item;
