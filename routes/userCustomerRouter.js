const authToken = require("../middleware/authToken");
const express = require("express");
const userCustomerRouter = express.Router();
const {
  displayMenu,
  createOrder,
  getPastOrders,
  getActiveOrders,
} = require("../controllers/userCustomerController");

// routes paths -> controllers
userCustomerRouter.get("/products", (req, res) => displayMenu(req, res));

userCustomerRouter.post("/new-order", authToken, (req, res) =>
  createOrder(req, res)
);
userCustomerRouter.get("/past-orders", authToken, (req, res) =>
  getPastOrders(req, res)
);
userCustomerRouter.get("/active-orders", authToken, (req, res) =>
  getActiveOrders(req, res)
);

module.exports = userCustomerRouter;
