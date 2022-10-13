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
  let { username, password, passwordConfirm } = req.body;
  let validation = true;

  if (!username || !password) {
    validation = false;
    res.send({ errMsg: "Username must be provided." });
  }

  if (password.length > 8) {
    validation = false;
    res.send({ errMsg: "Password must be at least 8 characters long." });
  }

  if (password != passwordConfirm) {
    validation = false;
    res.send({ errMsg: "Password does not match." });
  }

  if (validation) {
    res.send({ msg: "this is a signup success message" });
    // pool.query("inserting user to db logic here")
  } else {
    res.send({ errMsg: "this is a signup error message" })
  }
});

/**
 * Log out
 */
router.post("/logout", (req, res) => {
  // Hyunbae area
  res.send("");
});

module.exports = router;
