const express = require("express");
const userVendorRouter = express.Router();
const {
  createUser,
  setLocation,
  getOutstandingOrders,
  getVendorsLocations,
  getAllOrders,
  setFulfill,
} = require("../controllers/userVendorController");

// routes paths -> controllers
userVendorRouter.post("/create-user", (req, res) => createUser(req, res));
userVendorRouter.post("/set-location", (req, res) => setLocation(req, res));
userVendorRouter.get("/vendors-locations", (req, res) =>
  getVendorsLocations(req, res)
);
userVendorRouter.get("/:vendorId/outstanding-orders", (req, res) =>
  getOutstandingOrders(req, res)
);
userVendorRouter.get("/:vendorId/all-orders", (req, res) =>
  getAllOrders(req, res)
);
userVendorRouter.patch("/:vendorId/:orderId/set-fulfill", (req, res) =>
  setFulfill(req, res)
);

module.exports = userVendorRouter;
