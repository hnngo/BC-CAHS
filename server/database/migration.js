const migrate = (pool) => {
  /**
   * Create table User
   */
  pool.query(
    `CREATE TABLE IF NOT EXISTS public.user ( \
    user_id SERIAL PRIMARY KEY NOT NULL, \
    username varchar(25) NOT NULL, \
    password varchar(25) NOT NULL,
    first_name varchar(25) NOT NULL,
    last_name varchar(25) NOT NULL \
  )`,
    (err, res) => {
      if (!err) {
        console.log("Created User Table");
      }
    }
  );

  /**
   * Create user auth junction/associative table
   */
  pool.query(
    `CREATE TABLE IF NOT EXISTS public.user_auth ( \
    created_at datetime NOT NULL,
    user_id int NOT NULL,
    auth_id int NOT NULL,
    FOREIGN KEY (user_id) REFERENCES public.user(user_id),
    FOREIGN KEY (auth_id) REFERENCES public.auth(auth_id)
  )`,
    (err, res) => {
      if (!err) {
        console.log("Created user_auth table");
      }
    }
  );

  /**
   * Create auth table
   */

  pool.query(
    `CREATE TYPE auth_type AS ENUM ('READ_SAMPLE', 'WRITE_SAMPLE', 'DELETE_SAMPLE')`
  );
  pool.query(
    `CREATE TABLE IF NOT EXISTS public.auth (
    auth_id SERIAL NOT NULL,
    auth_type auth_type NOT NULL
  )`,
    (err, res) => {
      if (!err) {
        console.log("Created auth table");
      }
    }
  );

  /**
   * Create table Form
   */

  /**
   * Create table Form Tracking
   */
};

module.exports = migrate;
