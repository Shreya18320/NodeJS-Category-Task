const express = require("express");
require("./config/db");

const app = express();

app.use(express.json());

// category routes
app.use("/api/category", require("../routes/category.routes"));

module.exports = app;
