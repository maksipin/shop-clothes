const express = require("express");
const auth = require("../middleware/auth.middleware");
const CartProduct = require("../models/CartProduct");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(auth, async (req, res) => {
    try {
      const user_id = req.user._id;
      const list = await CartProduct.find({ user_id: { $eq: user_id } });
      res.send(list);
    } catch (e) {
      console.log(e.message);
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const user_id = req.user._id;
      await CartProduct.create({ ...req.body });
      const list = await CartProduct.find({ user_id: { $eq: user_id } });
      res.send(list);
    } catch (e) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  });
router.patch("/:cartProductId", async (req, res) => {
  try {
    const { cartProductId } = req.params;
    const list = await CartProduct.findByIdAndUpdate(cartProductId, {
      ...req.body,
    });
    res.send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});
router.delete("/:cartProductId", async (req, res) => {
  try {
    const { cartProductId } = req.params;
    await CartProduct.findByIdAndDelete(cartProductId);
    res.send(null);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});
module.exports = router;
