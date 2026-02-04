const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    subcategory_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    discount_type: {
      type: String,
      enum: ["percentage", "flat"],
      required: true,
    },
    discount_value: {
      type: Number,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Offer", offerSchema);
