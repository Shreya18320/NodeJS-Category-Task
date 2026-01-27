const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Category = sequelize.define("categories", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  name: DataTypes.STRING,
  image: DataTypes.STRING
}, {
  timestamps: false,
  freezeTableName: true
});

Category.associate = (models) => {
  Category.hasMany(models.Subcategory, {
    foreignKey: "category_id",
    as: "subcategories"
  });
};

module.exports = Category;
