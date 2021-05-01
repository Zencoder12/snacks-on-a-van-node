const winston = require("winston");
require("winston-mongodb");

module.exports = function () {
  winston.add(
    new winston.transports.Console({
      level: "info",
      colorize: true,
      prettyPrint: true,
      handleExceptions: true,
      handleRejections: true,
      timestamp: true,
    })
  );

  winston.add(
    new winston.transports.File({
      level: "info",
      filename: "logfile.log",
      handleExceptions: true,
      handleRejections: true,
      timestamp: true,
    })
  );

  // winston.add(
  //   new winston.transports.MongoDB({
  //     db: "mongodb://localhost/27017/tbfigthers",
  //     collection: "logs",
  //     capped: true,
  //     options: { useUnifiedTopology: true },
  //     metaKey: "meta",
  //   })
  // );
};
