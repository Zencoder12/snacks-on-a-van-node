const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to Snacks on a Van!");
});

module.exports = router;
