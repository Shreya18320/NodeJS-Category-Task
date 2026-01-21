require("dotenv").config();
const express = require("express");
const app = express();
const sequelize = require("./src/config/sequelize");
// 🔥 LOAD MODELS
const Category = require("./src/models/categorymodel");
const Subcategory = require("./src/models/subcategorymodel");
const Item = require("./src/models/itemsmodel");

// 🔥 ATTACH RELATIONS
const models = { Category, Subcategory, Item };

Object.values(models).forEach((model) => {
  if (model.relations) {
    model.relations(models);
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

app.use("/categories", categoryRoutes);
app.use("/subcategories", subcategoryRoutes);
app.use("/items", itemsRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});



