const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const policeSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    //name
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
      default: 0,
    },
    email: {
      type: String,
    },
  },
  { timestamps: true }
);

policeSchema.index(
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

const Police = mongoose.model("Police", policeSchema);

module.exports = { Police };
