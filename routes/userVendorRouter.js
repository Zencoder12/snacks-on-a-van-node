const authToken = require("../middleware/authToken");
const express = require("express");
const userVendorRouter = express.Router();
const {
  closeLocation,
  setLocation,
  getActiveOrders,
  getVendorsLocations,
  getVendorLocation,
  getPastOrders,
  getReadyOrders,
  setFulfill,
  setIsReady,
} = require("../controllers/userVendorController");

// routes paths -> controllers
userVendorRouter.post("/set-location", (req, res) => setLocation(req, res));

userVendorRouter.get("/vendors-locations", (req, res) =>
  getVendorsLocations(req, res)
);

userVendorRouter.get("/vendor-location", authToken, (req, res) =>
  getVendorLocation(req, res)
);

userVendorRouter.get("/active-orders", authToken, (req, res) =>
  getActiveOrders(req, res)
);

userVendorRouter.get("/past-orders", authToken, (req, res) =>
  getPastOrders(req, res)
);

userVendorRouter.get("/ready-orders", authToken, (req, res) =>
  getReadyOrders(req, res)
);

userVendorRouter.patch("/set-ready", authToken, (req, res) =>
  setIsReady(req, res)
);

userVendorRouter.patch("/set-fulfill", authToken, (req, res) =>
  setFulfill(req, res)
);

userVendorRouter.delete("/close-location", authToken, (req, res) =>
  closeLocation(req, res)
);

module.exports = userVendorRouter;
