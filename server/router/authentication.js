const express = require("express");
const router = express.Router();
const pool = require("../database");

/**
 * Get users
 */
router.get("/", (req, res) => {
  // Fetcj
  // pool.query
  res.send("");
});

/**
 * Update
 */
router.post("/", (req, res) => {
  //
  res.send("");
});

module.exports = router;
