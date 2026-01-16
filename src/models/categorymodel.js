const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");



const Category = sequelize.define("categories", {
  name: DataTypes.STRING,
  image: DataTypes.STRING
}, {
  timestamps: false
});

module.exports = Category;
