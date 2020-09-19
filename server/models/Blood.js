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
    continents: {
      type: Number,
      default: 1,
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
      title: 5,
      description: 1,
    },
  }
);

const Blood = mongoose.model("Blood", bloodSchema);

module.exports = { Blood };
