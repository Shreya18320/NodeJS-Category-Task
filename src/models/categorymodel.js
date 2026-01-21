const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const Subcategory = require("./subcategorymodel");



const Category = sequelize.define("categories", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },

  name: {
    type: DataTypes.STRING
  },

  image: {
    type: DataTypes.STRING
  }
}, {
  timestamps: false,
  freezeTableName: true  
});


Category.relations = (models) => {
  Category.hasMany(models.Subcategory, {
    foreignKey: "category_id",
    as: "subcategories"
  });
};


module.exports = Category;
