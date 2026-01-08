// const express = require("express");
// const app = express();

// app.use(express.json());

// const categoryRoutes = require("./src/controllers/category");
// const subCategoryRoutes = require("./src/controllers/subcategory");

// app.use("/categories", categoryRoutes);
// app.use("/subcategories", subCategoryRoutes);
// app.use("/uploads", express.static("uploads"));




// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log("Server running on port " + PORT);
// });

require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));

const categoryRoutes = require("./src/routes/categoryRoutes");
const subcategoryRoutes = require("./src/routes/subcategoryRoutes");

app.use("/categories", categoryRoutes);
app.use("/subcategories", subcategoryRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});



