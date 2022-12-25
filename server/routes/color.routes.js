const express = require("express");
const auth = require("../middleware/auth.middleware");
const Color = require("../models/Color");
const router = express.Router({ mergeParams: true });
const chalk = require("chalk");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const list = await Color.find();
      res.send(list);
    } catch (e) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  })
  .post(async (req, res) => {
    try {
      await Color.create({ ...req.body });
      const list = await Color.find();
      res.send(list);
    } catch (e) {
      console.log(chalk.red(e.message));
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  });
router.delete("/:colorId", async (req, res) => {
  try {
    const { colorId } = req.params;
    await Color.findByIdAndDelete(colorId);
    const list = await Color.find();
    res.send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});
module.exports = router;
