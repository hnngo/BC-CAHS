const { Pool } = require('pg');
const migrate = require("./migration");
const pool = new Pool({
  user: 'postgres',
  host: 'postgres',
  database: 'cahs',
  password: 'password',
  port: 5432,
})

migrate(pool);

// pool.query('SELECT * FROM users', (err, res) => {
//   console.log(res.rows);
// })

module.exports = pool;
