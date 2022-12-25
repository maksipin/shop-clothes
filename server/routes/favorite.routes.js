const express = require("express");
const Favorite = require("../models/Favorite");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(auth, async (req, res) => {
    try {
      const list = await Favorite.find();
      res.status(200).send(list);
    } catch (e) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newFavoriteItem = await Favorite.create({ ...req.body });
      res.status(200).send(newFavoriteItem);
    } catch (e) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  })
  .patch(auth, async (req, res) => {
    try {
      const favorites = await Favorite.find();
      await req.body.forEach((item) => {
        const haveFavorite = favorites.find((i) => {
          return i.product_id.toString() === item.product_id;
        });
        if (haveFavorite === undefined) {
          Favorite.create({ ...item, user_id: req.user._id });
        }
      });
      res.status(200).send(null);
    } catch (e) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  });

router.delete("/:favoriteId", auth, async (req, res) => {
  try {
    const { favoriteId } = req.params;
    const removedFavoriteProduct = await Favorite.findById(favoriteId);
    console.log(removedFavoriteProduct);
    console.log(req.user);
    if (removedFavoriteProduct.user_id.toString() === req.user._id) {
      await removedFavoriteProduct.remove();
      return res.send(null);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
