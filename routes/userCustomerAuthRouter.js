const express = require("express");
const userCustomerAuthRouter = express.Router();
const {
  loginUserCustomer,
} = require("../controllers/userCustomerAuthController");

userCustomerAuthRouter.post("/", (req, res) => loginUserCustomer(req, res));

module.exports = userCustomerAuthRouter;
