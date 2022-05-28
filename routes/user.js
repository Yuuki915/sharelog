const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.use("/auth");

router.get("/auth", (req, res) => {
  res.send("auth");
});

module.exports = router;
