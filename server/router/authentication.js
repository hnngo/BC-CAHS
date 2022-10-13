const express = require("express");
const router = express.Router();
const pool = require("../database");

/**
 * Connect with Pool.
 */
const client = await pool.connect();

/**
* The pool will emit an error on behalf of any idle clients
* it contains if a backend error or network partition happens
*/
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
})

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
router.post("/login", async (req, res) => {
  // Max area

  const { username, password } = req.body;

  const usernameCheck = `SELECT *
               FROM public.user
               WHERE username = ${username}`;

  try {

    const data = await client.query(usernameCheck);
    const user = data.rows[0];

    if (user.length == 0) {

      res.status(400).json({
        error: "No user registered with that name. Sign up first."
      });

    } else {
      // This will be the statement block where password authentication logic is kept.

      if (user[0] === password) {
        res.status(200).json({
          msg: "User signed in!"
        })

      } else {
        res.status(201).json({
          msg: "Login Failed. Please check Username or Password"
        })
      }
    }
  } catch (error) {

    console.log(error);
    res.status(500).json({
      errMsg: "Internal Server Error"
    });
  }
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
