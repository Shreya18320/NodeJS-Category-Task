const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
      unique: true
    },
    img: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// 🔹 category → subcategories (VIRTUAL)
categorySchema.virtual("subcategories", {
  ref: "Subcategory",
  localField: "_id",
  foreignField: "category_id",
});

// enable virtuals
categorySchema.set("toJSON", { virtuals: true });
categorySchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Category", categorySchema);
