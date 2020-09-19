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
    address: {
      type: String,
    },

    images: {
      type: Array,
      default: [],
    },
    phoneNumber: {
      type: Number,
      default: 0,
    },
    email: {
      type: String,
    },
    price: {
      type: Number,
    },
  },
  { timestamps: true }
);

grocerySchema.index(
  {
    title: "text",
    price: "text",
  },
  {
    weights: {
      title: 5,
      price: 5,
    },
  }
);

const Grocery = mongoose.model("Grocery", grocerySchema);

module.exports = { Grocery };
