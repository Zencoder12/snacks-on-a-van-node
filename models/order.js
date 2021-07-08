const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const orderSchema = new mongoose.Schema({
  invoice: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true,
  },
  customerName: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true,
  },
  customerEmail: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
  },
  vendorName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
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
  isReady: {
    type: Boolean,
    required: true,
    default: false,
  },
  isCancelled: {
    type: Boolean,
    required: true,
    default: false,
  },
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

// encapsulated function to generate invoice Id
orderSchema.methods.generateInvoiceNumber = function (vendorName) {
  const prefix = vendorName.substring(0, 3).toUpperCase();

  const suffix1 = getRandomInt(0, 100).toString();

  const d = new Date();

  return prefix + "-" + d.getDate() + d.getMonth() + d.getFullYear() + suffix1;
};

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
    orderId: Joi.objectId().required(),
    isFulfilled: Joi.boolean().required(),
  });

  return orderSchema.validate(order);
}

function validateIsReadyUpdate(order) {
  const orderSchema = Joi.object({
    orderId: Joi.objectId().required(),
    isDiscounted: Joi.boolean().required(),
    isReady: Joi.boolean().required(),
  });

  return orderSchema.validate(order);
}

function validateSetCancel(order) {
  const orderSchema = Joi.object({
    orderId: Joi.objectId().required(),
    isCancelled: Joi.boolean().required(),
  });

  return orderSchema.validate(order);
}

function validateUpdateOrder(order) {
  const orderSchema = Joi.object({
    orderId: Joi.objectId().required(),
    orderItems: Joi.array().min(1).required(),
  });

  return orderSchema.validate(order);
}

exports.Order = Order;
exports.validateOrder = validateOrder;
exports.validateFulfillUpdate = validateFulfillUpdate;
exports.validateIsReadyUpdate = validateIsReadyUpdate;
exports.validateSetCancel = validateSetCancel;
exports.validateUpdateOrder = validateUpdateOrder;
