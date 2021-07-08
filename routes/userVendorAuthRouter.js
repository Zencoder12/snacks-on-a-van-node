const express = require("express");
const userVendorAuthRouter = express.Router();
const { login, signUp } = require("../controllers/userVendorAuthController");

userVendorAuthRouter.post("/", (req, res) => login(req, res));

userVendorAuthRouter.post("/sign-up", (req, res) => signUp(req, res));

module.exports = userVendorAuthRouter;
