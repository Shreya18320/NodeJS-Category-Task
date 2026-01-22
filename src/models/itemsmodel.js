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
   timestamps: false,
      freezeTableName: true
});


module.exports = Item;
