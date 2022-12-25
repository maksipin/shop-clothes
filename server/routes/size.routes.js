const express = require("express");
const uuid = require("uuid");
const path = require("path");
const auth = require("../middleware/auth.middleware");
const Size = require("../models/Size");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(async (req, res) => {
    try {
      const list = await Size.find();
      res.send(list);
    } catch (e) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  })
  .post(async (req, res) => {
    try {
      await Size.create({ ...req.body });
      const list = await Size.find();
      res.send(list);
    } catch (e) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  });
router.delete("/:sizeId", async (req, res) => {
  try {
    const { sizeId } = req.params;
    await Size.findByIdAndDelete(sizeId);
    const list = await Size.find();
    res.send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});
module.exports = router;
