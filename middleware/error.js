const winston = require("winston");
require("./logging")();

module.exports = function (err, req, res, next) {
  winston.error(err.message, { err });
  res.status(500).send("Something Failed");
};
