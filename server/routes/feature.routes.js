const express = require("express");
const Feature = require("../models/Feature");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });

router.post("/", async (req, res) => {
  try {
    await Feature.create({ ...req.body });
    res.send(null);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});
router.patch("/:featureId", async (req, res) => {
  try {
    const { featureId } = req.params;
    const list = await Feature.findByIdAndUpdate(featureId, res.body, {
      new: true,
    });
    res.send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.get("/:productId", async (req, res) => {
  try {
    const { productId } = res.params;
    const list = await Feature.find({ product_id: { $eq: productId } });
    res.send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
