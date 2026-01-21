const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const Category = require("./categorymodel"); 
const Item = require("./itemsmodel"); 


const Subcategory = sequelize.define("subcategories", {
   id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  
  category_id: {
    type: DataTypes.INTEGER
  },

  name: {
    type: DataTypes.STRING
  }
}, {
  timestamps: false,
  freezeTableName: true
});



// relations

Subcategory.relations = (models) => {
  Subcategory.belongsTo(models.Category, {
    foreignKey: "category_id"
  });

  Subcategory.hasMany(models.Item, {
    foreignKey: "subcategory_id",
    as: "items"
  });
};


module.exports = Subcategory;


