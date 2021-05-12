const express = require("express");
const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
  res.send("Welcome to The Bald Figthers Back-End!");
});

module.exports = homeRouter;
