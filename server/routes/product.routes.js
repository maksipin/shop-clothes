const express = require("express");
const uuid = require("uuid");
const chalk = require("chalk");
const path = require("path");
const auth = require("../middleware/auth.middleware");
const Product = require("../models/Product");
const CartProduct = require("../models/CartProduct");
const router = express.Router({ mergeParams: true });

router.route("/").get(async (req, res) => {
  try {
    const list = await Product.find();
    res.send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    res.send(product);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    await Product.create({ ...req.body });
    const list = await Product.find().sort({ createdAt: -1 });
    res.send(list[0]);
  } catch (e) {
    console.log(chalk.red(e.message));
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});
router.patch("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    await Product.findByIdAndUpdate(productId, req.body);
    res.send(null);
  } catch (e) {
    console.log(chalk.red(e.message));
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});
router.patch("/quantity", auth, async (req, res) => {
  try {
    const user_id = req.user._id;
    const list = await CartProduct.find({ user_id: { $eq: user_id } });
    list.forEach(async (cartItem) => {
      const product = await Product.findById(cartItem.product_id);
      product.feature.forEach((item) => {
        if (
          item.size === cartItem.feature.size &&
          item.color.code === cartItem.feature.color.code
        )
          item = { ...item, quantity: cartItem.feature.quantity };
      });
      await Product.findByIdAndUpdate(cartProductId, { ...product });
    });
    res.send(null);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});
router.patch("/img/:productId", async (req, res) => {
  try {
    const { img } = req.files;
    const { productId } = req.params;
    const fileName = uuid.v4() + ".jpg";
    img.mv(path.resolve(__dirname, "..", "static", fileName));
    const product = await Product.findById(productId);
    product.img.push(fileName);
    const list = await Product.findByIdAndUpdate(productId, {
      img: product.img,
    });
    res.send(product.img);
  } catch (e) {
    console.log(chalk.red(e.message));
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});
module.exports = router;
