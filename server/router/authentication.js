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
 * Login in
 */
router.post("/login", (req, res) => {
  // Max area
  res.send("");
});

/**
 * Sign up
 */
router.post("/signup", (req, res) => {
  // Hyunbae area
  res.send("");
});

/**
 * Log out
 */
router.post("/logout", (req, res) => {
  // Hyunbae area
  res.send("");
});

module.exports = router;
