// src/models/subcategory.model.js
const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema(
  {
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category"
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100
    }
  },
  {
     timestamps: false 
    }
);

module.exports = mongoose.model("Subcategory", subcategorySchema);
