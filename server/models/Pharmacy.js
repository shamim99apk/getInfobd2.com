const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pharmacySchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      maxlength: 50,
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

pharmacySchema.index(
  {
    title: "text",
    address: "text",
  },
  {
    weights: {
      title: 5,
      address: 5,
    },
  }
);

const Pharmacy = mongoose.model("Pharmacy", pharmacySchema);

module.exports = { Pharmacy };
