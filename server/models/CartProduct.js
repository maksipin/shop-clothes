const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    feature: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("CartProduct", schema);
