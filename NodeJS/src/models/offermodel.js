const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Offer = sequelize.define("offers", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  subcategory_id: DataTypes.INTEGER,
  title: DataTypes.STRING,
  discount_type: DataTypes.ENUM("percentage", "flat"),
  discount_value: DataTypes.INTEGER,
  start_date: DataTypes.DATEONLY,
  end_date: DataTypes.DATEONLY
}, {
  timestamps: false,
  freezeTableName: true
});

Offer.associate = (models) => {
  Offer.belongsTo(models.Subcategory, {
    foreignKey: "subcategory_id"
  });
};

module.exports = Offer;
