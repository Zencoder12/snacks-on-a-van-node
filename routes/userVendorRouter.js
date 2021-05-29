const authToken = require("../middleware/authToken");
const express = require("express");
const userVendorRouter = express.Router();
const {
  closeLocation,
  createUser,
  setLocation,
  getOutstandingOrders,
  getVendorsLocations,
  getPastOrders,
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
userVendorRouter.get("/past-orders", authToken, (req, res) =>
  getPastOrders(req, res)
);
userVendorRouter.patch("/:vendorId/:orderId/set-fulfill", (req, res) =>
  setFulfill(req, res)
);
userVendorRouter.delete("/close-location", (req, res) =>
  closeLocation(req, res)
);

module.exports = userVendorRouter;
