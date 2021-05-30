const mongoose = require("mongoose");
const { UserVendor } = require("../models/userVendor");
const {
  Order,
  validateFulfillUpdate,
  validateIsReadyUpdate,
} = require("../models/order");
const {
  VendorLocation,
  validateVendorLocation,
} = require("../models/vendorLocation");

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
const getActiveOrders = async (req, res) => {
  // check whether vendorID exists in the database
  const vendor = await UserVendor.findById(req.user._id);
  if (!vendor)
    return res.status(404).send("The vendor with the given ID was not found.");

  // retrieve all vendor's orders and filter the ones which isFulfilled is marked as false
  // if outstanding orders exists, send back to the client
  const orders = await Order.find({
    vendorName: vendor.vendorName,
    isFulfilled: false,
    isReady: false,
  })
    .lean()
    .select("customerName orderItems orderTime");

  res.send(orders);
};

// GET ORDERS READY FOR PICK UP
const getReadyOrders = async (req, res) => {
  // check whether vendorID exists in the database
  const vendor = await UserVendor.findById(req.user._id);
  if (!vendor)
    return res.status(404).send("The vendor with the given ID was not found.");

  // retrieve all vendor's orders and filter the ones which are ready for customer pick-up
  const orders = await Order.find({
    vendorName: vendor.vendorName,
    isFulfilled: false,
    isReady: true,
  })
    .lean()
    .select("customerName orderItems orderTime");

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

// MARK ORDER AS READY
setIsReady = async (req, res) => {
  // validate req.body object
  const { error } = validateIsReadyUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check whether vendorID exists in the database
  const vendor = await UserVendor.findById(req.user._id);
  if (!vendor)
    return res.status(404).send("The vendor with the given ID was not found.");

  // check whether orderID exists in the database. If exists, update isFulfilled field
  const order = await Order.findByIdAndUpdate(
    req.body.orderId,
    {
      $set: {
        isReady: req.body.isReady,
      },
    },
    { new: true }
  );

  if (!order)
    return res.status(400).send("The order with the given ID was not found.");

  res.send({
    orderId: order._id,
    isReady: order.isReady,
  });
};

// MARK ORDER AS FULFILLED
setFulfill = async (req, res) => {
  // validate req.body object
  const { error } = validateFulfillUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check whether vendorID exists in the database
  const vendor = await UserVendor.findById(req.user._id);
  if (!vendor)
    return res.status(404).send("The vendor with the given ID was not found.");

  // check whether orderID exists in the database. If exists, update isFulfilled field
  const order = await Order.findByIdAndUpdate(
    req.body.orderId,
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
  setLocation,
  getActiveOrders,
  getVendorsLocations,
  getPastOrders,
  getReadyOrders,
  setFulfill,
  setIsReady,
};
