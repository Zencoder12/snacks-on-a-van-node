require("dotenv").config();
require("./order");
require("./product");
require("./userCustomer");
require("./userVendor");
require("../middleware/logging");
const winston = require("winston");
const mongoose = require("mongoose");

// // HEROKU CONNECTION

CONNECTION_STRING =
  "mongodb+srv://felipe:<password>@cluster0.owulp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

MONGO_URL = CONNECTION_STRING.replace(
  "felipe",
  process.env.MONGO_USERNAME
).replace("<password>", process.env.MONGO_PASSWORD);

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  dbName: "thebaldfigthers",
});

// // LOCAL HOST CONNECTION

// mongoose
//   .connect("mongodb://localhost/27017", {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     dbName: "tbfigthers",
//   })
//   .then(() => winston.info("Connected to MongoDB..."))
//   .catch((err) => winston.error("Could not connect to MongoDB...", { err }));

const db = mongoose.connection;

db.on("error", (err) => {
  console.error(err);
  process.exit(1);
});

db.once("open", async () => {
  winston.info("Mongo connection started on" + db.host + ":" + db.port);
});
