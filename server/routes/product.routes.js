const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const productValidation = require("../validations/productValidator");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");

// Create a new product
router.post(
  "/",
  auth,
  validate(productValidation.createProduct),
  productController.createProduct
);

// Get all products
router.get("/", auth, productController.listProduct);

// Get product by ID
router.get("/:id", auth, productController.getProduct);

// Update product
router.put(
  "/:id",
  auth,
  validate(productValidation.updateProduct),
  productController.updateProduct
);

// Delete product
router.delete("/:id", auth, productController.deleteProduct);

module.exports = router;
