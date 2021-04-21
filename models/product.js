const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    minlength: 5,
    maxlength: 32,
    uppercase: true,
    trim: true,
    required: true,
  },
  sizes: {
    type: [String],
    validate: function (a) {
      return a.length > 0;
    },
    message: "A product should have at least one size",
    required: true,
  },
  prices: {
    type: [Number],
    validate: function (a) {
      a.length > 0;
    },
    message: "A product should have at least one price",
    required: true,
  },
  img: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

function validateProduct(product) {
  const schema = Joi.object({
    productName: Joi.string().min(3).max(32).required(),
    sizes: Joi.array().items(Joi.string()).min(1).max(50).required(),
    prices: Joi.array().items(Joi.number()).min(1).max(50).required(),
    img: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(product);
}

exports.Product = Product;
exports.validate = validateProduct;
