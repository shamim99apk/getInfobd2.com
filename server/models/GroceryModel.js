const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const grocerySchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      maxlength: 50,
    },
    description: {
      type: String,
    },

    images: {
      type: Array,
      default: [],
    },

    name: {
      type: String,
    },
    price: {
      type: Array,
    },

    address: {
      type: String,
      maxlength: 50,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: Array,
    },
  },
  { timestamps: true }
);

grocerySchema.index(
  {
    title: "text",
    description: "text",
  },
  {
    weights: {
      name: 5,
      description: 1,
    },
  }
);

const GroceryModel = mongoose.model("GroceryModel", grocerySchema);

module.exports = { GroceryModel };
