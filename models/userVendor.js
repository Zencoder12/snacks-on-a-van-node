const Joi = require("joi");
const mongoose = require("mongoose");

const userVendorSchema = new mongoose.Schema({
  vendorName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: true,
  },
  phone: {
    type: String,
    minlength: 5,
    maxlength: 25,
    required: true,
  },
  location: {
    type: String,
    default: "",
    maxlength: 255,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
  isVendor: {
    type: Boolean,
    default: true,
  },
});

const UserVendor = mongoose.model("User_vendor", userVendorSchema);

function validateUserVendor(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    phone: Joi.string().min(5).max(25).required(),
    password: Joi.string().min(5).max(255).required(),
    vendorName: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

function validateSetLocation(user) {
  const schema = Joi.object({
    location: Joi.string().max(255).required(),
    isOpen: Joi.boolean().required(),
  });

  return schema.validate(user);
}

exports.UserVendor = UserVendor;
exports.validateUserVendor = validateUserVendor;
exports.validateSetLocation = validateSetLocation;
