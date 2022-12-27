const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    type_id: {
      type: Schema.Types.ObjectId,
      ref: "TypeProduct",
    },
    article: {
      type: String,
    },
    img: {
      type: Array,
    },

    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    description: {
      type: Array,
    },

    feature: {
      type: Object,
    },

    rate: {
      type: Schema.Types.ObjectId,
      ref: "Rate",
    },
    label: [
      {
        type: Schema.Types.ObjectId,
        ref: "TypeProduct",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", schema);
