const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Subcategory = sequelize.define("subcategories", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  category_id: DataTypes.INTEGER,
  name: DataTypes.STRING
}, {
  timestamps: false,
  freezeTableName: true
});

Subcategory.associate = (models) => {
  // parent
  Subcategory.belongsTo(models.Category, {
    foreignKey: "category_id"
  });

  // children
  Subcategory.hasMany(models.Item, {
    foreignKey: "subcategory_id",
    as: "items"
  });

  Subcategory.hasMany(models.Offer, {
    foreignKey: "subcategory_id",
    as: "offers"
  });
};

module.exports = Subcategory;
