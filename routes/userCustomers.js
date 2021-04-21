const {
  UserCustomer,
  validateUserCustomer,
} = require("../models/userCustomer");
const { Order, validateOrder } = require("../models/order");
const { Product } = require("../models/product");
const { UserVendor } = require("../models/userVendor");
const mongoose = require("mongoose");
const express = require("express");

const router = express.Router();

// ROUTE TO CREATE CUSTOMER USER

router.post("/create-user", async (req, res) => {
  // validate req.body object
  const { error } = validateUserCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check whether the provided email already exists in the database
  let user = await UserCustomer.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  // after performed all validations, create new customer and save
  user = new UserCustomer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
  });

  await user.save();

  res.send({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
  });
});

// ------ CUSTOMERS APP OPERATIONS ------

// ROUTE TO GET VIEW MENU OF SNACKS

router.get("/:customerId/menu", async (req, res) => {
  // check whether path URL customerID is a valid mongo DB id object
  if (!mongoose.Types.ObjectId.isValid(req.params.customerId))
    return res.status(404).send("Not a valid customer Id.");

  // check whether customerID exists in the database
  const customer = await UserCustomer.findById(req.params.customerId);
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  // after all validations complete, retrieve all registered products in the database (if any)
  const products = await Product.find()
    .sort("productName")
    .select("productName sizes prices img -_id");

  if (!products.length)
    return res.send("Current there are no available products.");

  res.send(products);
});

// ROUTE TO GET VIEW DETAILS OF SNACK

router.get("/:customerId/product/:productId", async (req, res) => {
  // check whether path URL customerID is a valid mongo DB id object
  if (!mongoose.Types.ObjectId.isValid(req.params.customerId))
    return res.status(404).send("Not a valid customer Id.");

  // check whether path URL productID is a valid mongo DB id object
  if (!mongoose.Types.ObjectId.isValid(req.params.productId))
    return res.status(404).send("Not a valid product Id.");

  // check whether customerID exists in the database
  const customer = await UserCustomer.findById(req.params.customerId);
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  // check whether productID exists in the database. If exists, return it to the client
  const product = await Product.findById(req.params.productId).select(
    "productName sizes prices img -_id"
  );
  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  res.send(product);
});

// ROUTE FOR CUSTOMER TO START A NEW ORDER

router.post("/:customerId/new-order", async (req, res) => {
  // check whether path URL customerID is a valid mongo DB id object
  if (!mongoose.Types.ObjectId.isValid(req.params.customerId))
    return res.status(404).send("Not a valid customer Id.");

  // validate req.body object
  const { error } = validateOrder(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  // check whether customerID exists in the database
  const customer = await UserCustomer.findById(req.params.customerId);
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  // check whether vendorID provided in req.body exists in the database
  const vendor = await UserVendor.findById(req.body.vendor);
  if (!vendor)
    return res.status(404).send("The vendor with the given ID was not found.");

  // orderItems are assumed to come from the shopping cart (information stored in the browser local storage)
  // create new order and return to the client
  let order = new Order({
    customer: customer._id,
    vendor: vendor._id,
    orderItems: req.body.orderItems,
  });

  order = await order.save();

  res.send({
    OrderId: order._id,
    Customer: customer.firstName,
    Vendor: vendor.vendorName,
    Items: order.orderItems,
    Time: order.orderTime,
  });
});

module.exports = router;
