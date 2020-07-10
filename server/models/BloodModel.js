const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bloodSchema = mongoose.Schema(
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
    continents: {
      type: String,
    },

    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    bloodGroup: {
      type: String,
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

bloodSchema.index(
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

const BloodModel = mongoose.model("BloodModel", bloodSchema);

module.exports = { BloodModel };
