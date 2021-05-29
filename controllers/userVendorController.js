const mongoose = require("mongoose");
const { UserVendor, validateUserVendor } = require("../models/userVendor");
const { Order, validateFulfillUpdate } = require("../models/order");
const {
  VendorLocation,
  validateVendorLocation,
} = require("../models/vendorLocation");

// CREATE USER VENDOR
const createUser = async (req, res) => {
  // validate req.body object
  const { error } = validateUserVendor(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  // check whether the provided email already exists in the database
  let user = await UserVendor.findOne({ email: req.body.email });
  if (user) return res.status(404).send("User already registered.");

  // after performed all validations, create new vendor and save
  user = new UserVendor({
    vendorName: req.body.vendorName,
    contactName: req.body.contactName,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
  });

  await user.save();

  res.send({
    vendorName: user.vendorName,
    email: user.email,
    phone: user.phone,
  });
};

// SET VAN LOCATION AND OPEN FOR BUSINESS
const setLocation = async (req, res) => {
  // validate req.body object
  const { error } = validateVendorLocation(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const vendor = await VendorLocation.findOne({
    vendorName: req.body.vendorName,
  });
  if (vendor)
    return res
      .status(400)
      .send("The location for this vendor has already been set.");

  const vendorLocation = new VendorLocation({
    vendorName: req.body.vendorName,
    coordinates: req.body.coordinates,
    address: req.body.address,
  });

  await vendorLocation.save();

  res.send({
    vendorName: vendorLocation.vendorName,
    coordinates: vendorLocation.coordinates,
    address: vendorLocation.address,
  });
};

// SET VAN STATUS NOT OPEN FOR BUSINESS
const closeLocation = async (req, res) => {
  const vendorLocation = await VendorLocation.findOneAndDelete({
    vendorName: req.body.vendorName,
  });

  res.send(vendorLocation);
};

// GET ALL LOCATIONS OF VENDORS THAT ARE OPEN FOR BUSINESS
const getVendorsLocations = async (req, res) => {
  const vendorLocations = await VendorLocation.find();

  res.send(vendorLocations);
};

// GET OUTSTANDING ORDERS
const getOutstandingOrders = async (req, res) => {
  // check whether path URL vendorID is a valid mongo DB id object
  if (!mongoose.Types.ObjectId.isValid(req.params.vendorId))
    return res.status(404).send("Not a valid vendor Id.");

  // check whether vendorID exists in the database
  const vendor = await UserVendor.findById(req.params.vendorId);
  if (!vendor)
    return res.status(404).send("The vendor with the given ID was not found.");

  // retrieve all vendor's orders and filter the ones which isFulfilled is marked as false
  // if outstanding orders exists, send back to the client
  const orders = await Order.find({
    vendor: req.params.vendorId,
    isFulfilled: false,
  })
    .lean()
    .populate("customer", "firstName lastName phone -_id")
    .select("customer orderItems");

  if (!orders.length)
    return res.status(404).send("There are no outstanding orders.");

  res.send(orders);
};

// GET PAST ORDERS
const getPastOrders = async (req, res) => {
  // check whether vendorID exists in the database
  const vendor = await UserVendor.findById(req.user._id);
  if (!vendor)
    return res.status(404).send("The vendor with the given ID was not found.");

  // if order exists and is fulfilled, send back to the client
  const orders = await Order.find({
    vendorName: vendor.vendorName,
    isFulfilled: true,
  }).lean();

  res.send(orders);
};

// MARK ORDER AS FULFILLED
setFulfill = async (req, res) => {
  // check whether path URL vendorID is a valid mongo DB id object
  if (!mongoose.Types.ObjectId.isValid(req.params.vendorId))
    return res.status(404).send("Not a valid vendor Id.");

  // check whether path URL orderID is a valid mongo DB id object
  if (!mongoose.Types.ObjectId.isValid(req.params.orderId))
    return res.status(404).send("Not a valid order Id.");

  // validate req.body object
  const { error } = validateFulfillUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check whether vendorID exists in the database
  const vendor = await UserVendor.findById(req.params.vendorId);
  if (!vendor)
    return res.status(404).send("The vendor with the given ID was not found.");

  // check whether orderID exists in the database. If exists, update isFulfilled field
  const order = await Order.findByIdAndUpdate(
    req.params.orderId,
    {
      $set: {
        isFulfilled: req.body.isFulfilled,
      },
    },
    { new: true }
  );

  if (!order)
    return res.status(400).send("The order with the given ID was not found.");

  res.send({
    orderId: order._id,
    isFulfilled: order.isFulfilled,
  });
};

module.exports = {
  closeLocation,
  createUser,
  setLocation,
  getOutstandingOrders,
  getVendorsLocations,
  getPastOrders,
  setFulfill,
};
