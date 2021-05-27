const config = require("config");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userVendorSchema = new mongoose.Schema({
  vendorName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  contactName: {
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
  isVendor: {
    type: Boolean,
    default: true,
  },
});

// encapsulated function to generate jwt token
userVendorSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, vendorName: this.vendorName, isVendor: this.isVendor },
    config.get("jwtPrivateKey")
  );
  return token;
};

const UserVendor = mongoose.model("User_vendor", userVendorSchema);

function validateUserVendor(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    phone: Joi.string().min(5).max(25).required(),
    password: Joi.string().min(5).max(1024).required(),
    vendorName: Joi.string().min(5).max(255).required(),
    contactName: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

exports.UserVendor = UserVendor;
exports.validateUserVendor = validateUserVendor;
