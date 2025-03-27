const express = require("express");
const authRoute = require("./auth.routes");
const productRoute = require("./product.routes");

const router = express.Router();

router.use("/auth", authRoute);
router.use("/products", productRoute);

module.exports = router;
