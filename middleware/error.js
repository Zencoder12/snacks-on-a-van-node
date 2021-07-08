const winston = require("winston");
require("./logging")();

// 500 -> Internal server error

module.exports = function (err, req, res, next) {
  winston.error(err.message, { err });
  res.status(500).send("Something Failed");
};
