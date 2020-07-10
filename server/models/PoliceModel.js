const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const policeSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    images: {
      type: Array,
      default: [],
    },

    firstName: {
      type: String,
    },
    lastName: {
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
    district: {
      type: String,
    },
  },
  { timestamps: true }
);

policeSchema.index(
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

const PoliceModel = mongoose.model("PoliceModel", policeSchema);

module.exports = { PoliceModel };
