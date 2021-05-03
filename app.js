require("express-async-errors");
require("./models");
require("./middleware/logging")();
const config = require("config");
const winston = require("winston");
const error = require("./middleware/error");
const express = require("express");
const app = express();
const cors = require("cors");
const home = require("./routes/home");
const products = require("./routes/products");
const userCustomers = require("./routes/userCustomers");
const userVendors = require("./routes/userVendors");
const userCustomerAuth = require("./routes/userCustomerAuth");

if (!config.get("jwtPrivateKey")) {
  winston.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

app.use(cors());
app.use(express.json());
app.use("/", home);
app.use("/products", products);
app.use("/customers", userCustomers);
app.use("/customers/auth", userCustomerAuth);
app.use("/vendors", userVendors);

/* replaces express routes try and catch block */
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
