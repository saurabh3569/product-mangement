const { PRODUCT_NOT_FOUND } = require("../constant/errorConstant");
const Product = require("../models/Product");
const CustomError = require("../utils/customError");
const { successResponse } = require("../utils/responseHandler");

const createProduct = async (req, res, next) => {
  try {
    const { name, price, description, stock } = req.body;

    const product = new Product({
      name,
      price,
      description,
      stock,
      user: req.user._id,
    });

    await product.save();
    return successResponse(res, product, "Product created successfully");
  } catch (error) {
    console.error("Create Product Error:", error.message);
    next(error);
  }
};

const listProduct = async (req, res, next) => {
  try {
    const products = await Product.find({ user: req.user._id });
    return successResponse(res, products, "Products fetched successfully");
  } catch (error) {
    console.error("List Products Error:", error.message);
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!product) {
      throw new CustomError(404, PRODUCT_NOT_FOUND);
    }
    return successResponse(res, product, "Product fetched successfully");
  } catch (error) {
    console.error("Get Product Error:", error.message);
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!product) {
      throw new CustomError(404, PRODUCT_NOT_FOUND);
    }

    product.name = req.body.name ?? product.name;
    product.price = req.body.price ?? product.price;
    product.description = req.body.description ?? product.description;
    product.stock = req.body.stock ?? product.stock;

    await product.save();
    return successResponse(res, product, "Product updated successfully");
  } catch (error) {
    console.error("Update Product Error:", error.message);
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!product) {
      throw new CustomError(404, PRODUCT_NOT_FOUND);
    }
    await product.deleteOne();
    return successResponse(res, product, "Product deleted successfully");
  } catch (error) {
    console.error("Delete Product Error:", error.message);
    next(error);
  }
};

module.exports = {
  createProduct,
  listProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
