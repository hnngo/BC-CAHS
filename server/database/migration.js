const migrate = (pool) => {
  /**
   * Create table User
   */
  pool.query(`CREATE TABLE IF NOT EXISTS public.user ( \
    id SERIAL PRIMARY KEY NOT NULL, \
    username varchar(45) NOT NULL, \
    password varchar(450) NOT NULL \
  )`, (err, res) => {
    if (!err) {
      console.log("Created User Table");
    }
  });


  /**
   * Create table Form
   */

  /**
   * Create table Form Tracking
   */

}

module.exports = migrate;
