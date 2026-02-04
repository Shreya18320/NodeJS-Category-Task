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


subcategorySchema.virtual("items", {
  ref: "Item",
  localField: "_id",
  foreignField: "subcategory_id",
});


subcategorySchema.virtual("offers", {
  ref: "Offer",
  localField: "_id",
  foreignField: "subcategory_id",
});


subcategorySchema.set("toJSON", { virtuals: true });
subcategorySchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Subcategory", subcategorySchema);
