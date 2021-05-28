const mongoose = require("mongoose");
const { UserCustomer } = require("../models/userCustomer");
const { Product } = require("../models/product");
const { UserVendor } = require("../models/userVendor");
const { Order, validateOrder } = require("../models/order");
const winston = require("winston");

// GET ALL PRODUCTS IN THE MENU
const displayMenu = async (req, res) => {
  const products = await Product.find().lean();

  if (!products.length)
    return res.send("Current there are no available products.");

  res.send(products);
};

// GET VIEW DETAILS OF A SNACK
const getOneProduct = async (req, res) => {
  // check whether path URL productID is a valid mongo DB id object
  if (!mongoose.Types.ObjectId.isValid(req.params.productId))
    return res.status(404).send("Not a valid product Id.");

  // check whether productID exists in the database. If exists, return it to the client
  const product = await Product.findById(req.params.productId).lean();

  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  res.send(product);
};

// ROUTE FOR CUSTOMER TO START A NEW ORDER
const createOrder = async (req, res) => {
  // validate req.body object
  const { error } = validateOrder(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  // check whether customerID exists in the database
  const customer = await UserCustomer.findById(req.user._id);
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  // check whether vendorID provided in req.body exists in the database
  const vendor = await UserVendor.findOne({ vendorName: req.body.vendorName });
  if (!vendor) return res.status(404).send("The vendor was not found.");

  // after all validations, create new order and return to the client
  let order = new Order({
    customerEmail: customer.email,
    vendorName: vendor.vendorName,
    orderItems: req.body.orderItems,
  });

  order = await order.save();

  res.send({
    orderId: order._id,
    customer: customer.firstName,
    customerEmail: customer.email,
    vendor: vendor.vendorName,
    orderItems: order.orderItems,
    time: order.orderTime,
  });
};

// ROUTE FOR CUSTOMER TO GET PAST ORDERS
const getPastOrders = async (req, res) => {
  // check whether customerID exists in the database
  const customer = await UserCustomer.findById(req.user._id);
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  // retrieve all customer's orders
  const orders = await Order.find({
    customer: customer,
    isFulfilled: true,
  }).select("orderItems orderTime _id");

  res.send(orders);
};

// ROUTE FOR CUSTOMER TO GET ACTIVE ORDERS
const getActiveOrders = async (req, res) => {
  // check whether customerID exists in the database
  const customer = await UserCustomer.findById(req.user._id);
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  // retrieve all customer's orders
  const orders = await Order.find({
    customer: customer,
    isFulfilled: false,
  }).select("orderItems orderTime _id");

  res.send(orders);
};

module.exports = {
  displayMenu,
  getOneProduct,
  createOrder,
  getPastOrders,
  getActiveOrders,
};
