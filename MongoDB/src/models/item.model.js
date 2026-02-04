const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    subcategory_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Subcategory"
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    stock: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
     timestamps: true 
    
    }
);

module.exports = mongoose.model("Item", itemSchema);
