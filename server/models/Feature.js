const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    color: {
      type: Schema.Types.ObjectId,
      ref: "Color",
    },
    size: {
      type: Schema.Types.ObjectId,
      ref: "Size",
    },
    quantity: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Feature", schema);
