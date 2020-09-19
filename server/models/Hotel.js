const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hotelSchema = mongoose.Schema(
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
    link: {
      type: String,
    },

    phoneNumber: {
      type: Number,
    },
    email: {
      type: String,
    },
  },
  { timestamps: true }
);

hotelSchema.index(
  {
    title: "text",
    description: "text",
  },
  {
    weights: {
      title: 5,
      description: 5,
    },
  }
);

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = { Hotel };
