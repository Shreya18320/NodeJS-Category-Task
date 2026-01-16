const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");




const Subcategory = sequelize.define("subcategories", {
  name: DataTypes.STRING,
  category_id: DataTypes.INTEGER
}, {
  timestamps: false
});

module.exports = Subcategory;
