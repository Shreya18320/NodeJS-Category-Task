const express = require("express");
const app = express();
const path = require("path");


app.use(express.json());

app.use("/category", require("./routes/category.routes"));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/subcategory", require("./routes/subcategory.routes"));
app.use("/item", require("./routes/item.routes"));


module.exports = app;
