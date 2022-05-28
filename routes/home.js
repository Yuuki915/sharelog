const express = require("express");
const router = express.Router();
const User = require("./user");

router.use("/auth", User);

router.get("/", (req, res) => {
  res.send("user");
});

module.exports = router;
