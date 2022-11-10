const { Pool } = require("pg");
const migrate = require("./migration");
const pool = new Pool({
  user: "postgres",
  host: "postgres",
  database: "cahs",
  password: "password",
  port: 5432,
});

migrate(pool);

const poolAsync = (...args) => {
  return new Promise((resolve, reject) => {
    pool
      .query(...args)
      .then(resolve)
      .catch(reject);
  });
};
// pool.query('SELECT * FROM users', (err, res) => {
//   console.log(res);
// })

module.exports = { pool, poolAsync };
