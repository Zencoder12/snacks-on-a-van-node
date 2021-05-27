const Joi = require("joi");
const mongoose = require("mongoose");

const vendorLocationSchema = new mongoose.Schema({
  vendorName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  coordinates: {
    type: Array,
    required: true,
  },
  address: {
    type: String,
    minlength: 5,
    maxlength: 255,
  },
});

const VendorLocation = mongoose.model("Vendor_location", vendorLocationSchema);

function validateVendorLocation(data) {
  const schema = Joi.object({
    vendorName: Joi.string().min(5).max(255).required(),
    coordinates: Joi.array().min(2).required(),
    address: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(data);
}

exports.VendorLocation = VendorLocation;
exports.validateVendorLocation = validateVendorLocation;
