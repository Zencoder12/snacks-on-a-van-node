const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User_customer",
    required: true,
  },
  vendor: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User_vendor",
    required: true,
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
    vendor: Joi.objectId().required(),
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
