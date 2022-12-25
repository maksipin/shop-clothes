const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    link: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Image", schema);
