const express = require("express");
const uuid = require("uuid");
const path = require("path");
const auth = require("../middleware/auth.middleware");
const TypeProduct = require("../models/TypeProduct");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(async (req, res) => {
    try {
      const list = await TypeProduct.find();
      res.send(list);
    } catch (e) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  })
  .post(async (req, res) => {
    console.log(req.body);
    try {
      const { img } = req.files;
      const fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      await TypeProduct.create({ ...req.body, img: fileName });
      const list = await TypeProduct.find();
      res.send(list);
    } catch (e) {
      console.log(e.message);

      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  });
router
  .route("/:typeId")
  .patch(async (req, res) => {
    try {
      const { typeId } = req.params;
      if (req.files) {
        const { img } = req.files;
        const fileName = uuid.v4() + ".jpg";
        img.mv(path.resolve(__dirname, "..", "static", fileName));
        await TypeProduct.findByIdAndUpdate(
          typeId,
          { ...req.body, img: fileName },
          {
            new: true,
          }
        );
      } else {
        const updateType = await TypeProduct.findByIdAndUpdate(
          typeId,
          req.body,
          {
            new: true,
          }
        );
        console.log(updateType);
      }
      const list = await TypeProduct.find();
      res.send(list);
    } catch (e) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  })
  .delete(async (req, res) => {
    try {
      const { typeId } = req.params;
      await TypeProduct.findByIdAndDelete(typeId);
      const list = await TypeProduct.find();
      res.send(list);
    } catch (e) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  });

module.exports = router;
