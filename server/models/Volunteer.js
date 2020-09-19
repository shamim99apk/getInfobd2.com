const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const volunteerSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      maxlength: 50,
    },
    fullName: {
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
  },
  { timestamps: true }
);

volunteerSchema.index(
  {
    title: "text",
    fullName: "text",
  },
  {
    weights: {
      title: 5,
      fullName: 5,
    },
  }
);

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

module.exports = { Volunteer };
