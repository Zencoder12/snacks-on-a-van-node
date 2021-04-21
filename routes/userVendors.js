const { Order, validateFulfillUpdate } = require("../models/order");
const {
  UserVendor,
  validateUserVendor,
  validateSetLocation,
} = require("../models/userVendor");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// ROUTE TO CREATE USER VENDOR

router.post("/create-user", async (req, res) => {
  // validate req.body object
  const { error } = validateUserVendor(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  // check whether the provided email already exists in the database
  let user = await UserVendor.findOne({ email: req.body.email });
  if (user) return res.status(404).send("User already registered.");

  // after performed all validations, create new vendor and save
  user = new UserVendor({
    vendorName: req.body.vendorName,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
  });

  await user.save();

  res.send(user);
});

// ------ VENDOR APP OPERATIONS ------

// ROUTE FOR VENDOR TO SET VAN LOCATION AND OPEN FOR BUSINESS

router.patch("/:vendorId/set-location/", async (req, res) => {
  // check whether path URL vendorID is a valid mongo DB id object
  if (!mongoose.Types.ObjectId.isValid(req.params.vendorId))
    return res.status(404).send("Not a valid vendor Id.");

  // validate req.body object
  const { error } = validateSetLocation(req.body);
  if (error) res.status(400).send(error.details[0].message);

  /* after performed all validations check whether vendorID
  exists in the database and update location and isOpen fields status */
  const vendor = await UserVendor.findByIdAndUpdate(
    req.params.vendorId,
    {
      $set: {
        location: req.body.location,
        isOpen: req.body.isOpen,
      },
    },
    { new: true }
  );

  if (!vendor)
    return res.status(404).send("The vendor with the given ID was not found.");

  res.send(vendor);
});

// ROUTE TO GET OUTSTANDING ORDERS

router.get("/:vendorId/outstanding-orders/", async (req, res) => {
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
  });

  if (!orders.length)
    return res.status(404).send("There are no outstanding orders.");

  res.send(orders);
});

// ROUTE TO MARK ORDER AS FULFILLED

router.patch("/:vendorId/:orderId/set-fulfill", async (req, res) => {
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

  res.send(order);
});

// ROUTE TO GET ALL ORDERS

router.get("/:vendorId/all-orders/", async (req, res) => {
  // check whether path URL vendorID is a valid mongo DB id object
  if (!mongoose.Types.ObjectId.isValid(req.params.vendorId))
    return res.status(404).send("Not a valid vendor Id.");

  // check whether vendorID exists in the database
  const vendor = await UserVendor.findById(req.params.vendorId);
  if (!vendor)
    return res.status(404).send("The vendor with the given ID was not found.");

  // if order exists to the specific exists retrieve all and send to the client
  const orders = await Order.find({ vendor: req.params.vendorId });

  if (!orders.length)
    return res.status(404).send("There are no outstanding orders.");

  res.send(orders);
});

module.exports = router;
