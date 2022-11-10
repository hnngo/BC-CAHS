const express = require("express");
const router = express.Router();
const { pool } = require("../database");
const session = require("express-session");
const bcrypt = require("bcrypt");
const { ERROR_CODE } = require("../utils/errorCodes");
const validateSignup = require("../utils/validateSignup");

// Time that a cookie lasts (8 hours in milliseconds)
const cookieTTL = 100 * 60 * 60 * 8;

//session middleware
router.use(
  session({
    secret: "thisIsMySecreteCode",
    saveUninitialized: true,
    cookie: { maxAge: cookieTTL },
    resave: false,
  })
);

/**
 * Get users
 */
router.get("/", (req, res) => {
  // Fetcj
  // pool.query
  res.send("");
});

/**
 * Check if session is currently valid.
 */
router.get("/authUser", async (req, res) => {
  res.json({ error: 0, data: req.session });
});

/**
 * Login in
 */
router.post("/login", async (req, res) => {
  // Think about the need of a unique username
  const { username, password } = req.body;

  const usernameCheck = `SELECT *
               FROM public."user"
               WHERE username = '${username}'`;

  try {
    // possibly ensure that session is not already in existence.

    const data = await pool.query(usernameCheck);
    const user = data.rows;

    //confirms existence of user in DB.
    if (user.length == 0) {
      res.status(400).json({
        error: "No user registered with that name. Sign up first.",
      });
    } else {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (err) {
          res.status(500).json({
            error: ERROR_CODE.SERVER_ERROR,
            msg: "Server error",
          });
        } else if (result === true) {
          req.session.user = user[0];
          delete req.session.user.password;
          req.session.auth = true;
          res.status(200).json({
            error: 0,
            msg: "User signed in!",
            data: user[0],
          });
        } else if (result != true) {
          res.status(400).json({
            error: ERROR_CODE.AUTH_WRONG_PASSWORD,
            msg: "Wrong password! Please try again.",
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: ERROR_CODE.SERVER_ERROR,
      msg: "Internal Server Error",
    });
  }
});

/**
 * Sign up
 */
router.post("/signup", async (req, res) => {
  let { username, password, confirmPassword, first_name, last_name } = req.body;
  try {
    // validate user input again
    let hashedPw = await bcrypt.hash(password, 10);
    await validateSignup(req.body)
      .then((msg) => {
        if (msg.length == 0) {
          // if there are no error messages returned
          // see if user with provided username already exists in database
          pool.query(
            `SELECT * FROM public.user
            WHERE username = $1`,
            [username],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                if (result.rows.length > 0) {
                  // if username is a duplicate
                  res.send({
                    error: ERROR_CODE.AUTH_ACCOUNT_EXISTS,
                    msg: "Account with that username already exists",
                    data: {
                      username: username,
                    },
                  });
                } else {
                  // else, add user to database
                  pool.query(
                    `INSERT INTO public.user (username, password, first_name, last_name)
                  VALUES ($1, $2, $3, $4)
                  RETURNING username, password, first_name, last_name`,
                    [username, hashedPw, first_name, last_name],
                    (err, result) => {
                      if (err) {
                        console.log(err);
                      } else {
                        // send json as response if user signup was successful
                        res.send({
                          error: ERROR_CODE.NO_ERROR,
                          msg: "You have signed up successfully",
                          data: {
                            username: username,
                            first_name: first_name,
                            last_name: last_name,
                          },
                        });
                      }
                    }
                  );
                }
              }
            }
          );
        } else {
          // if there is some sort of error
          res.send(msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
});

/**
 * Log out
 */
router.post("/logout", (req, res) => {
  req.session.destroy();
  res.send({ error: 0 });
});

module.exports = router;
