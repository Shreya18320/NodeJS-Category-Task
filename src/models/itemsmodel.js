const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Item = sequelize.define("items", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  subcategory_id: DataTypes.INTEGER,
  name: DataTypes.STRING,
  price: DataTypes.FLOAT,
  created_at: DataTypes.DATE,
  rating: DataTypes.FLOAT,
  stock: DataTypes.INTEGER
}, {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false,
  freezeTableName: true
});

Item.associate = (models) => {
  Item.belongsTo(models.Subcategory, {
    foreignKey: "subcategory_id"
  });
};

module.exports = Item;
