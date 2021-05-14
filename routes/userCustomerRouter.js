const authToken = require("../middleware/authToken");
const express = require("express");
const userCustomerRouter = express.Router();
const {
  displayMenu,
  getOneProduct,
  createOrder,
  getAllOrders,
} = require("../controllers/userCustomerController");

// routes paths -> controllers
userCustomerRouter.get("/products", (req, res) => displayMenu(req, res));
userCustomerRouter.get("/products/:productId", (req, res) =>
  getOneProduct(req, res)
);
userCustomerRouter.post("/new-order", authToken, (req, res) =>
  createOrder(req, res)
);
userCustomerRouter.get("/orders", authToken, (req, res) =>
  getAllOrders(req, res)
);

module.exports = userCustomerRouter;
