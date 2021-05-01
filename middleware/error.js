const winston = require("winston");
require("./logging")();

module.exports = function (err, req, res, next) {
  winston.log("error", err.message);
  res.status(500).send("Something Failed");
};
