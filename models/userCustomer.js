const Joi = require("joi");
const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");

const userCustomerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
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
  isCustomer: {
    type: Boolean,
    default: true,
    required: true,
  },
});

/* encapsulated function to generate jwt token */
userCustomerSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, firstName: this.firstName, email: this.email },
    config.get("jwtPrivateKey")
  );
  return token;
};

const UserCustomer = mongoose.model("User_customer", userCustomerSchema);

function validateUserCustomer(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    phone: Joi.string().min(5).max(25).required(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(user);
}

exports.UserCustomer = UserCustomer;
exports.validateUserCustomer = validateUserCustomer;
