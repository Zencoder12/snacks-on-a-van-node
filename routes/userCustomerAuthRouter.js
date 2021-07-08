const express = require("express");
const userCustomerAuthRouter = express.Router();
const { login, signUp } = require("../controllers/userCustomerAuthController");

userCustomerAuthRouter.post("/", (req, res) => login(req, res));

userCustomerAuthRouter.post("/sign-up", (req, res) => signUp(req, res));

module.exports = userCustomerAuthRouter;
