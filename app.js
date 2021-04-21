require("express-async-errors");
// require("./models");
const error = require("./middleware/error");
const express = require("express");
const app = express();
const home = require("./routes/home");
const mongoose = require("mongoose");
const products = require("./routes/products");
const userCustomers = require("./routes/userCustomers");
const userVendors = require("./routes/userVendors");

mongoose
  .connect("mongodb://localhost:27017/tbfigthers", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(express.json());
app.use("/", home);
app.use("/products", products);
app.use("/customers", userCustomers);
app.use("/vendors", userVendors);

// replaces routes try and catch block
// app.use(error);

process.on("uncaughtException", (ex) => {
  console.log("WE GOT AN UNCAUGHT EXCEPTION");
  process.exit(1);
});

process.on("unhandledRejection", (ex) => {
  console.log("WE GOT AN UNHANDLED REJECTION");
  process.exit(1);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
