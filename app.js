require("express-async-errors");
require("./models");
require("./middleware/logging")();
const winston = require("winston");
const error = require("./middleware/error");
const express = require("express");
const app = express();
const home = require("./routes/home");
const products = require("./routes/products");
const userCustomers = require("./routes/userCustomers");
const userVendors = require("./routes/userVendors");

app.use(express.json());
app.use("/", home);
app.use("/products", products);
app.use("/customers", userCustomers);
app.use("/vendors", userVendors);

// replaces routes try and catch block
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
