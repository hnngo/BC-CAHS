const migrate = async (pool) => {
  /**
   * Create table User
   */
  await pool.query(
    `CREATE TABLE IF NOT EXISTS public.user ( \
    user_id SERIAL PRIMARY KEY NOT NULL UNIQUE, \
    username VARCHAR(25) NOT NULL, \
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(25) NOT NULL,
    last_name VARCHAR(25) NOT NULL
  )`
  );
  console.log("Finished user table");

  /**
   * Create auth table
   */

  await pool.query(
    `DO $$ BEGIN
      CREATE TYPE auth_type AS ENUM ('READ_SAMPLE', 'WRITE_SAMPLE', 'DELETE_SAMPLE');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE TABLE IF NOT EXISTS public.auth (
    auth_id SERIAL PRIMARY KEY NOT NULL UNIQUE,
    auth_type auth_type NOT NULL
  )`
  );

  /**
   * Create user auth junction/associative table
   */
  await pool.query(
    `CREATE TABLE IF NOT EXISTS public.user_auth (
    created_at TIMESTAMP NOT NULL,
    user_id int NOT NULL,
    auth_id int NOT NULL,
    FOREIGN KEY (user_id) REFERENCES public.user(user_id),
    FOREIGN KEY (auth_id) REFERENCES public.auth(auth_id)
  )`
  );
  console.log("Finished user auth table");

  /**
   * Create submission_details table
   */

  // need to handle other
  await pool.query(
    `DO $$ BEGIN
    CREATE TYPE analysis_requested_type AS ENUM ('ATPase', 'Bacteriology', 'Bio-Assay', 'ELISA Cortisol',
    'ELISA R.sal','PCR', 'Plankton ID', 'RT-qPCR', 'Sea Lice ID', 'Virology', 'Water Analysis');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    
    CREATE TABLE IF NOT EXISTS public.submission_details (
    submission_num VARCHAR(30) PRIMARY KEY NOT NULL UNIQUE,
    company_name VARCHAR(25) NOT NULL,
    submitter VARCHAR(25) NOT NULL,
    receipt_date DATE NOT NULL,
    sampling_time_submission TIMESTAMP NOT NULL,
    contact_phone_num VARCHAR(15) NOT NULL,
    purchase_order_num VARCHAR(15) NOT NULL,
    bc_cahs_receiver_last_name VARCHAR(15) NOT NULL,
    bc_cahs_receiver_first_name VARCHAR(15) NOT NULL,
    bc_cahs_custodian_initials VARCHAR(5) NOT NULL,
    client_case_num INT NOT NULL,
    sampling_date TIMESTAMP NOT NULL,
    bc_cahs_p_i VARCHAR(5) NOT NULL,
    sampling_location VARCHAR(50) NOT NULL,
    bc_cahs_project VARCHAR(30) NOT NULL,
    initial_placement VARCHAR(20) NOT NULL,
    analysis_requested analysis_requested_type NOT NULL
  )`
  );
  console.log("Finished submission details table");

  /**
   * Create sample_details
   */
  await pool.query(
    `DO $$ BEGIN
    CREATE TYPE sample_condition AS ENUM ('Dry Ice', 'Frozen', 'Ice Packs', 'Thawed', 'RT', 'Other');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
    CREATE TYPE sample_type AS ENUM ('Wild', 'Brood Stock', 'Freshwater', 'Saltwater', 'Other');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE TABLE IF NOT EXISTS public.sample_details (
      sample_id SERIAL PRIMARY KEY NOT NULL UNIQUE,
      num_of_samples SMALLINT NOT NULL,
      species VARCHAR(25) NOT NULL,
      other_details VARCHAR(255),
      sample_condition sample_condition NOT NULL,
      sample_type sample_type NOT NULL,
      submission_num VARCHAR(30) NOT NULL,
      FOREIGN KEY (submission_num) REFERENCES public.submission_details(submission_num)

    )`
  );
  console.log("Finished sample details table");

  // rtqpcr targets table
  await pool.query(
    `DO $$ BEGIN 
    CREATE TYPE rt_qpcr_type AS ENUM ('IHNv', 'IPNv', 'ISAv', 'VHSv', 'PRV-L1', 'A.sal', 'P.sal', 'R.sal', 'ELFa', 'N.perurans');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;                                                                                   

    CREATE TABLE IF NOT EXISTS public.rt_qpcr_targets (
      rt_qpcr_id SERIAL PRIMARY KEY NOT NULL UNIQUE,
      rt_qpcr_type rt_qpcr_type NOT NULL
    )`
  );
  console.log("Finished rtqpcr targets table");

  // submission rtqpcr associative table
  await pool.query(
    `                                                                             
    CREATE TABLE IF NOT EXISTS public.submission_rt_qpcr (
    other_description VARCHAR(255),
    rt_qpcr_id INT NOT NULL,
    sample_id INT NOT NULL,
    FOREIGN KEY (rt_qpcr_id) REFERENCES public.rt_qpcr_targets(rt_qpcr_id),
    FOREIGN KEY (sample_id) REFERENCES public.sample_details(sample_id)
    )`
  );
  console.log("Finished submission rtqpcr table");

  // sample status information Table
  await pool.query(
    `
    CREATE TABLE IF NOT EXISTS public.sample_status_information (
      sample_status_id SERIAL PRIMARY KEY NOT NULL UNIQUE,
      cut_date TIMESTAMP,
      cut_date_initials VARCHAR(3),
      extraction_date TIMESTAMP,
      extraction_date_initials VARCHAR(3),
      recut_date TIMESTAMP,
      recut_date_initials VARCHAR(3),
      reextracted_date TIMESTAMP,
      reextracted_date_initials VARCHAR(3),
      reason_for_reextraction VARCHAR(255),
      qcpr_completed TIMESTAMP,
      submission_num VARCHAR(30) NOT NULL,
      FOREIGN KEY (submission_num) REFERENCES public.submission_details(submission_num)
    )
    `
  );
  console.log("Finished sample status table");

  // report table
  await pool.query(
    `
    CREATE TABLE IF NOT EXISTS public.report (
      report_id SERIAL PRIMARY KEY NOT NULL UNIQUE,
      report_date TIMESTAMP,
      discard_date TIMESTAMP,
      second_discard_date TIMESTAMP,
      submission_num VARCHAR(30) NOT NULL,
      FOREIGN KEY (submission_num) REFERENCES public.submission_details(submission_num)
    )
    `
  );
  console.log("Finished report table");

  // invoice table
  await pool.query(
    `
    CREATE TABLE IF NOT EXISTS public.invoice(
      invoice_num INT PRIMARY KEY NOT NULL UNIQUE,
      invoiced BOOLEAN,
      samples_invoiced SMALLINT,
      invoice_date TIMESTAMP,
      submission_num VARCHAR(30) NOT NULL,
      FOREIGN KEY (submission_num) REFERENCES public.submission_details(submission_num)
    )`
  );
  console.log("Finished invoice table");
};

module.exports = migrate;
