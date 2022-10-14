const { application } = require("express");
const express = require("express");
const router = express.Router();
const pool = require("../database");

const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

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
router.use(bodyParser.json())
router.post("/signup", async (req, res) => {
  let { username, password, passwordConfirm } = req.body;
  let validation = true;

  if (!username || !password) {
    validation = false;
    res.send({ errMsg: "Username must be provided." });
  }

  if (password.length < 8) {
    validation = false;
    res.send({ errMsg: "Password must be at least 8 characters long." });
  }

  // if (password != passwordConfirm) {
  //   validation = false;
  //   res.send({ errMsg: "Password does not match." });
  // }

  if (validation) {
    let hashedPw = await bcrypt.hash(password, 10);
    console.log(hashedPw);
    // res.send({ msg: "this is a signup success message" });

    pool.query(
      `SELECT * FROM public.user
      WHERE username = $1`, [username], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result.rows);
        if (result.rows.length > 0) {
          res.send({ errMsg: "Username is already registered. Please provide another." });
        } else {
          pool.query(
            `INSERT INTO public.user (username, password)
            VALUES ($1, $2)
            RETURNING id, password`, [username, hashedPw], (err, result) => {
            if (err) {
              res.send({ errMsg: "error" });
            } else {
              res.send({ msg: "Signup complete. Please log in using your login credentials." })
            }
          }
          )
        }
      }
    }
    );

  }

});

/**
 * Log out
 */
router.post("/logout", (req, res) => {
  req.logout();
  res.render("/authentication", { msg: "You have been logged out." });
});

module.exports = router;
