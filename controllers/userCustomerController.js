const mongoose = require("mongoose");
const { UserCustomer } = require("../models/userCustomer");
const { Product } = require("../models/product");
const { UserVendor } = require("../models/userVendor");
const {
  Order,
  validateOrder,
  validateSetCancel,
  validateUpdateOrder,
} = require("../models/order");
const { date } = require("joi");

// GET ALL PRODUCTS IN THE MENU
const displayMenu = async (req, res) => {
  const products = await Product.find().lean();

  if (!products.length)
    return res.send("Current there are no available products.");

  res.send(products);
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
    customerName: customer.firstName,
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

// ROUTE FOR A CUSTOMER TO CHANGE/UPDATE THE ORDER
const updateOrder = async (req, res) => {
  // validate req.body object
  const { error } = validateUpdateOrder(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  // check whether customerID exists in the database
  const customer = await UserCustomer.findById(req.user._id);
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  const order = await Order.findByIdAndUpdate(
    req.body.orderId,
    {
      $set: {
        orderItems: req.body.orderItems,
        orderTime: new Date(),
      },
    },
    { new: true }
  );

  if (!order)
    return res.status(400).send("The order with the given ID was not found.");

  res.send(order);
};

// ROUTE FOR CUSTOMER TO GET PAST ORDERS
const getPastOrders = async (req, res) => {
  // check whether customerID exists in the database
  const customer = await UserCustomer.findOne({
    email: req.user.email,
  });
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  // retrieve previous customer's orders
  const orders = await Order.find({
    customerEmail: customer.email,
    isFulfilled: true,
  }).select("orderItems orderTime _id");

  res.send(orders);
};

// ROUTE FOR CUSTOMER TO GET ACTIVE ORDERS
const getActiveOrders = async (req, res) => {
  // check whether customerID exists in the database
  const customer = await UserCustomer.findOne({
    email: req.user.email,
  });
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  // retrieve active customer's orders
  const orders = await Order.find({
    customerEmail: customer.email,
    isFulfilled: false,
  }).select("orderItems orderTime _id");

  res.send(orders);
};

// ROUTE FOR CUSTOMER APP TO GET CURRENT ORDER (TRACKING PAGE)
const getOneOrder = async (req, res) => {
  // check whether customerID exists in the database
  const customer = await UserCustomer.findOne({
    email: req.user.email,
  });
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  // retrieve active customer's orders
  const order = await Order.findById(req.body.orderId).lean();
  if (!order)
    return res.status(404).send("The order with the given ID was not found.");

  res.send(order);
};

const setCancel = async (req, res) => {
  // validate req.body object
  const { error } = validateSetCancel(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  // check whether customerID exists in the database
  const customer = await UserCustomer.findOne({
    email: req.user.email,
  });
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  // check whether orderID exists in the database. If exists, update isFulfilled field
  const order = await Order.findByIdAndUpdate(
    req.body.orderId,
    {
      $set: {
        isCancelled: req.body.isCancelled,
        isFulfilled: true,
      },
    },
    { new: true }
  );

  if (!order)
    return res.status(400).send("The order with the given ID was not found.");

  res.send({
    orderId: order._id,
    isCancelled: order.isCancelled,
  });
};

module.exports = {
  displayMenu,
  createOrder,
  getPastOrders,
  getActiveOrders,
  getOneOrder,
  setCancel,
  updateOrder,
};
