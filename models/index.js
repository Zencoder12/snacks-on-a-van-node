require("dotenv").config();
require("./order");
require("./product");
require("./userCustomer");
require("./userVendor");
const mongoose = require("mongoose");

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

const db = mongoose.connection;

db.on("error", (err) => {
  console.error(err);
  process.exit(1);
});

db.once("open", async () => {
  console.log("Mongo connection started on" + db.host + ":" + db.port);
});
