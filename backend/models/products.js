const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    desc: {
      type: String,
      require: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    size: {
      type: [String],
      require: true,
    },
    img: {
      type: String,
      require: true,
    },
    subimg: {
      type: [String],
    },
    color: {
      type: [String],
      require: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
