const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    size: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Size", schema);
