const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/user", require("./user.routes"));
router.use("/cart", require("./cart.routes"));
router.use("/type", require("./type.routes"));
router.use("/product", require("./product.routes"));
router.use("/size", require("./size.routes"));
router.use("/color", require("./color.routes"));
router.use("/favorite", require("./favorite.routes"));
router.use("/feature", require("./feature.routes"));

module.exports = router;
