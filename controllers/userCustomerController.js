const mongoose = require("mongoose");
const { UserCustomer } = require("../models/userCustomer");
const { Product } = require("../models/product");
const { UserVendor } = require("../models/userVendor");
const { Order, validateOrder } = require("../models/order");

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
  const vendor = await UserVendor.findById(req.body.vendor);
  if (!vendor)
    return res.status(404).send("The vendor with the given ID was not found.");

  // after all validations, create new order and return to the client
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
};

// ROUTE FOR CUSTOMER TO GET ALL ORDERS
const getAllOrders = async (req, res) => {
  // check whether customerID exists in the database
  const customer = await UserCustomer.findById(req.user._id);
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  // retrieve all customer's orders
  const orders = await Order.find({
    customer: customer,
  })
    .populate("customer", "firstName lastName phone -_id")
    .select("orderItems -_id -customer");

  if (!orders.length) return res.send("There are no outstanding orders.");

  res.send(orders);
};

module.exports = {
  displayMenu,
  getOneProduct,
  createOrder,
  getAllOrders,
};
