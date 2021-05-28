const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const orderSchema = new mongoose.Schema({
  customerEmail: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
    unique: true,
  },
  vendorName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  orderItems: {
    type: Array,
    required: true,
    validate: function (a) {
      return a.length > 0;
    },
  },
  orderTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  isFulfilled: {
    type: Boolean,
    required: true,
    default: false,
  },
  isDiscounted: {
    type: Boolean,
    required: true,
    default: false,
  },
  isPickedUp: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Order = mongoose.model("Order", orderSchema);

function validateOrder(order) {
  const orderSchema = Joi.object({
    vendorName: Joi.string().min(5).max(255).required(),
    orderItems: Joi.array().min(1).required(),
  });

  return orderSchema.validate(order);
}

function validateFulfillUpdate(order) {
  const orderSchema = Joi.object({
    isFulfilled: Joi.boolean().required(),
  });

  return orderSchema.validate(order);
}

exports.Order = Order;
exports.validateOrder = validateOrder;
exports.validateFulfillUpdate = validateFulfillUpdate;
