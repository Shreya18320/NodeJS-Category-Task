require("dotenv").config();
const express = require("express");
const app = express();
const sequelize = require("./src/config/sequelize");

const Category = require("./src/models/categorymodel");
const Subcategory = require("./src/models/subcategorymodel");
const Item = require("./src/models/itemsmodel");
const Offer = require("./src/models/offermodel");


const models = {
  Category,
  Subcategory,
  Item,
  Offer
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

sequelize.authenticate()
  .then(() => console.log("Sequelize connected"))
  .catch(err => console.log("Sequelize error", err));

app.use(express.json());
app.use("/uploads", express.static("uploads"));

const categoryRoutes = require("./src/routes/categoryRoutes");
const subcategoryRoutes = require("./src/routes/subcategoryRoutes");
const itemsRoutes = require("./src/routes/itemsRoutes");
const offerRoutes = require("./src/routes/offerRoutes");

app.use("/categories", categoryRoutes);
app.use("/subcategories", subcategoryRoutes);
app.use("/items", itemsRoutes);
app.use("/offers", offerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
