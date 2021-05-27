// connect to database
require("./models/db");
require("express-async-errors");
require("./middleware/logging")();
const config = require("config");
const winston = require("winston");
const error = require("./middleware/error");
const express = require("express");
const app = express();
const cors = require("cors");
const homeRouter = require("./routes/homeRouter");
const userCustomerRouter = require("./routes/userCustomerRouter");
const userCustomerAuthRouter = require("./routes/userCustomerAuthRouter");
const userVendorRouter = require("./routes/userVendorRouter");
const userVendorAuthRouter = require("./routes/userVendorAuthRouter");

if (!config.get("jwtPrivateKey")) {
  winston.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

// middlewares
app.use(cors());
app.use(express.json());

app.use("/", homeRouter);
app.use("/customers", userCustomerRouter);
app.use("/customers/auth", userCustomerAuthRouter);
app.use("/vendors", userVendorRouter);
app.use("/vendors/auth", userVendorAuthRouter);

/* replaces express routes try and catch block */
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
