const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emergencySchema = mongoose.Schema(
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

    phoneNumber: {
      type: Number,
    },
  },
  { timestamps: true }
);

emergencySchema.index(
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

const Emergency = mongoose.model("Emergency", emergencySchema);

module.exports = { Emergency };
