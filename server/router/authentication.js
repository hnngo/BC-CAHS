const { application } = require("express");
const express = require("express");
const router = express.Router();
const pool = require("../database");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

var client = null;

/**
 * Connect with Pool.
 */
(async () => {
  client = await pool.connect();
})();

/**
* The pool will emit an error on behalf of any idle clients
* it contains if a backend error or network partition happens
*/
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
})

// Time that a cookie lasts (8 hours in milliseconds)
const cookieTTL = 100 * 60 * 60 * 8

//session middleware
router.use(session({
  secret: "thisIsMySecreteCode",
  saveUninitialized: true,
  cookie: {maxAge: cookieTTL},
  resave:  false
}));

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

  // Think about the need of a unique username
  console.log(req.session);
  const { username, password } = req.body;

  const usernameCheck = `SELECT *
               FROM public."user"
               WHERE username = '${username}'`;

  try {
   // possibly ensure that session is not already in existence.

    const data = await client.query(usernameCheck);
    const user = data.rows;

    //confirms existence of user in DB.
    if (user.length == 0) {

      res.status(400).json({
        error: "No user registered with that name. Sign up first."
      });

    } else {
        bcrypt.compare(password, user[0].password, (err, result) => {

          if (err) {
            res.status(500).json({
              errMsg: "Server error",
            });

          } else if (result === true) {
              req.session.user = user[0];
              res.status(200).json({
                msg: "User signed in!",
              });

          } else if (result != true) {
              res.status(400).json({
                errMsg: "Wrong password! Please try again."
              });
          }
        })
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
router.use(bodyParser.json())
router.post("/signup", async (req, res) => {
  console.log(req.body);

  let { username, password, confirmPassword } = req.body;

    let hashedPw = await bcrypt.hash(password, 10);
    // console.log(hashedPw);

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
            RETURNING username, password, first_name, last_name`, [username, hashedPw], (err, result) => {
            if (err) {
              res.send({ errMsg: "error" });
            } else {
              alert("Signup complete! Please login using your login credentials.");
              res.redirect("/login");
            }
          }

          )
        }
      }
    }
    );

});

/**
 * Log out
 */
router.post("/logout", (req, res) => {
  req.logout();
  res.render("/authentication", { msg: "You have been logged out." });
});

module.exports = router;
