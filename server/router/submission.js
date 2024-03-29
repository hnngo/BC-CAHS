const express = require("express");
const router = express.Router();

// Utils
const { pool, poolAsync } = require("../database");

// Constants
const { ERROR_CODE, getErrorMessage } = require("../utils/errors");

// Mock data
const { sample_data, sample_status } = require("../mock/sample");

/**
 * Get forms
 */
router.get("/", async (req, res) => {
  const { limit = 20, offset = 0, analysis = "" } = req.query;
  const data = await poolAsync(`
    SELECT sd.*, sad.*, ssi.*,
      string_agg(rqt.rt_qpcr_target, ',') rt_qpcr_type
    FROM public.submission_details sd
    LEFT JOIN public.sample_details sad ON sd.submission_num = sad.submission_num
    LEFT JOIN public.submission_rt_qpcr srq ON srq.submission_num = sad.submission_num
    LEFT JOIN public.rt_qpcr_targets rqt ON rqt.rt_qpcr_id = srq.rt_qpcr_id
    LEFT JOIN public.sample_status_information ssi ON ssi.submission_num = sad.submission_num
    GROUP BY sd.submission_num, sad.sample_id, ssi.sample_status_id
    ORDER BY sd.receive_date DESC
    OFFSET ${offset}
    LIMIT ${limit}
  `);

  const countAll = await poolAsync(`
    SELECT count(*)
    FROM public.submission_details sd
  `);
  const totalNumberOfRows = countAll.rows[0].count;

  return res.status(200).json({
    error: 0,
    msg: "",
    data: {
      forms: data.rows,
      total: totalNumberOfRows,
    },
  });
});

/**
 * Submit a form
 */
router.post("/submit", async (req, res) => {
  let data = req.body;

  try {
    // main query
    let query = `
    DO $$ BEGIN
    INSERT INTO public.submission_details (submission_num, 
      company_name, submitter, receive_date, submit_time, sampling_location, sampling_date, contact_phone_num, 
      purchase_order_num, bc_cahs_receiver_name, bc_cahs_custodian_initials, client_case_num, bc_cahs_pi, 
      bc_cahs_project, initial_storage, analysis_requested, comment) 
      VALUES(
        '${data.submissionNum}', 
        '${data.companyName}', 
        '${data.submitter}', 
        '${data.receiveDate}', 
        '${data.submitTime}', 
        '${data.samplingLocation}', 
        '${data.samplingDate}', 
        '${data.contactPhoneNum}', 
        '${data.clientPO}', 
        '${data.receiver}', 
        '${data.custodian}', 
        '${data.clientCaseNum}', 
        '${data.PI}', 
        '${data.BCCAHSProject}',
        '${data.initialStorage}', 
        '${data.requestedAnalysis}',
        '${data.comment}');

    INSERT INTO public.sample_details (num_of_samples, species, sample_details, sample_type, sample_condition, sample_origin, submission_num)
    VALUES(
        ${data.sampleNum}, 
        '${data.sampleSpecies}', 
        '${data.sampleDetails}', 
        '${data.sampleType}', 
        '${data.sampleCondition}',
        '${data.sampleOrigin}',
        '${data.submissionNum}');
    
      INSERT INTO public.sample_status_information (submission_num)
        VALUES('${data.submissionNum}');
    `;

    // get all rtqpcr id and targets
    let rtqpcrTargets = await pool.query(
      `SELECT rt_qpcr_id, rt_qpcr_target FROM public.rt_qpcr_targets`
    );
    rtqpcrTargets = rtqpcrTargets.rows;

    //loop through all targets, match rtqpcr key to target, append to main query
    data.rtqpcrTarget.forEach((target) => {
      let rtqpcr = rtqpcrTargets.find((obj) => obj.rt_qpcr_target === target);
      let insert = `
      INSERT INTO public.submission_rt_qpcr (rt_qpcr_id, submission_num, other_description)
      VALUES(
        '${rtqpcr.rt_qpcr_id}',
        '${data.submissionNum}',
        '${data.otherDescription}');
        `;

      query += insert;
    });

    query += `END $$;`;

    await pool.query(query);

    // send data or error
    res.json({
      error: 0,
      msg: "Successfully saved form data to database!",
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.json({
      error: ERROR_CODE.DATABASE_ERROR,
      msg: err,
      data: {},
    });
  }
});

/**
 * Update a form
 */
router.post("/update", async (req, res) => {
  let data = req.body;

  try {
    // main query
    let query = `
      DO $$ BEGIN
      UPDATE public.submission_details
      SET
        company_name = '${data.companyName}',
        submitter = '${data.submitter}',
        receive_date = '${data.receiveDate}',
        submit_time = '${data.submitTime}',
        sampling_location = '${data.samplingLocation}',
        sampling_date = '${data.samplingDate}',
        contact_phone_num = '${data.contactPhoneNum}',
        purchase_order_num = '${data.clientPO}',
        bc_cahs_receiver_name = '${data.receiver}',
        bc_cahs_custodian_initials = '${data.custodian}',
        client_case_num = '${data.clientCaseNum}',
        bc_cahs_pi = '${data.PI}',
        bc_cahs_project = '${data.BCCAHSProject}',
        initial_storage = '${data.initialStorage}',
        analysis_requested = '${data.requestedAnalysis}',
        comment = '${data.comment}'
      WHERE submission_num = '${data.submissionNum}';

      UPDATE public.sample_details
      SET
        num_of_samples = ${data.sampleNum},
        species = '${data.sampleSpecies}',
        sample_details = '${data.sampleDetails}',
        sample_type = '${data.sampleType}',
        sample_condition = '${data.sampleCondition}',
        sample_origin = '${data.sampleOrigin}'
      WHERE submission_num = '${data.submissionNum}';

      DELETE FROM public.submission_rt_qpcr
      WHERE submission_num = '${data.submissionNum}';
    `;

    // get all rtqpcr id and targets
    let rtqpcrTargets = await pool.query(
      `SELECT rt_qpcr_id, rt_qpcr_target FROM public.rt_qpcr_targets`
    );
    rtqpcrTargets = rtqpcrTargets.rows;

    //loop through all targets, match rtqpcr key to target, append to main query
    data.rtqpcrTarget.forEach((target) => {
      let rtqpcr = rtqpcrTargets.find((obj) => obj.rt_qpcr_target === target);
      let insert = `
        INSERT INTO public.submission_rt_qpcr (rt_qpcr_id, submission_num, other_description)
        VALUES(
          '${rtqpcr.rt_qpcr_id}',
          '${data.submissionNum}',
          '${data.otherDescription}');
      `;

      query += insert;
    });

    query += `END $$;`;
    await pool.query(query);
    res.json({
      error: 0,
      msg: "Successfully updated form data to database!",
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.status(ERROR_CODE.DATABASE_ERROR).json({
      error: ERROR_CODE.DATABASE_ERROR,
      msg: err,
      data: {},
    });
  }
});

/**
 * Get status summary
 */
router.get("/status", async (req, res) => {
  try {
    const data = await poolAsync(`
      SELECT sd.analysis_requested, sd.status, count(*)
      FROM public.submission_details sd
      GROUP BY sd.analysis_requested, sd.status
    `);
    console.log(data);
    return res.status(200).json({
      error: 0,
      msg: "",
      data: data.rows,
    });
  } catch (err) {
    res.status(500).json({
      error: ERROR_CODE.DATABASE_ERROR,
      msg: getErrorMessage(ERROR_CODE.DATABASE_ERROR),
      data: {},
    });
  }
});

/**
 * Update status
 */
router.post("/status/update", async (req, res) => {
  const data = req.body;

  if (!data.submission_num) {
    return res.status(200).json({
      error: ERROR_CODE.MISSING_INFO,
      msg: getErrorMessage(ERROR_CODE.MISSING_INFO) + "(submission_num)",
      data: {},
    });
  }

  try {
    await pool.query(
      `UPDATE public.sample_status_information
      SET
        cut_date = $1,
        cut_date_initials = $2, 
        scale_verification_lower = $3,
        scale_verification_upper = $4,
        extraction_date = $5,
        extraction_date_initials = $6,
        recut_date = $7,
        recut_date_initials = $8,
        reextracted_date = $9,
        reextracted_date_initials = $10,
        reason_for_reextraction = $11,
        qcpr_complete_date = $12,
        positive_control_ct_lower = $13,
        positive_control_ct_upper = $14,
        negative_control_ct_lower = $15,
        negative_control_ct_upper = $16
      WHERE submission_num = $17;`,
      [
        data.cut_date,
        data.cut_date_initials,
        data.scale_verification_lower,
        data.scale_verification_upper,
        data.extraction_date,
        data.extraction_date_initials,
        data.recut_date,
        data.recut_date_initials,
        data.reextracted_date,
        data.reextracted_date_initials,
        data.reason_for_reextraction,
        data.qcpr_complete_date,
        data.positive_control_ct_lower,
        data.positive_control_ct_upper,
        data.negative_control_ct_lower,
        data.negative_control_ct_upper,
        data.submission_num,
      ]
    );
    await pool.query(
      `UPDATE public.submission_details
      SET
        status = $1
      WHERE submission_num = $2;`,
      [data.status, data.submission_num]
    );
  } catch (err) {
    return res.status(200).json({
      error: ERROR_CODE.SERVER_ERROR,
      msg: getErrorMessage(ERROR_CODE.SERVER_ERROR),
      data: {},
    });
  }

  res.status(200).json({
    error: 0,
    msg: "Updated successfully",
    data: {},
  });
});

/**
 * Get status by submission_num
 */
router.get("/status/:submission_num", async (req, res) => {
  const { submission_num } = req.params;

  try {
    const data = await poolAsync(`
      SELECT ssi.*, sd.status 
      FROM public.sample_status_information ssi
      LEFT JOIN public.submission_details sd ON ssi.submission_num = sd.submission_num
      WHERE ssi.submission_num = '${submission_num}'
    `);
    if (data && data.rowCount == 1) {
      res.status(200).json({
        error: 0,
        msg: "",
        data: data.rows[0],
      });
    } else {
      res.status(200).json({
        error: ERROR_CODE.FORM_NOT_FOUND,
        msg: getErrorMessage(ERROR_CODE.FORM_NOT_FOUND),
        data: data.rows[0],
      });
    }
  } catch (err) {
    res.status(500).json({
      error: ERROR_CODE.DATABASE_ERROR,
      msg: getErrorMessage(ERROR_CODE.DATABASE_ERROR),
      data: {},
    });
  }
});

/**
 * Get form by submission Number
 */
router.get("/:form_id", async (req, res) => {
  const { form_id } = req.params;

  const data = await pool.query(
    `
    SELECT sd.*, sad.*, ssi.*,
      string_agg(rqt.rt_qpcr_target, ',') rt_qpcr_type,
      string_agg(srq.other_description, ',') rt_qpcr_type_other
    FROM public.submission_details sd
    LEFT JOIN public.sample_details sad ON sd.submission_num = sad.submission_num
    LEFT JOIN public.submission_rt_qpcr srq ON srq.submission_num = sad.submission_num
    LEFT JOIN public.rt_qpcr_targets rqt ON rqt.rt_qpcr_id = srq.rt_qpcr_id
    LEFT JOIN public.sample_status_information ssi ON ssi.submission_num = sad.submission_num
    WHERE sad.submission_num = $1
    GROUP BY sd.submission_num, sad.sample_id, ssi.sample_status_id
    ORDER BY sd.receive_date
  `,
    [form_id]
  );

  res.status(200).json({
    error: 0,
    msg: "Fetched successfully",
    data: data.rows,
  });
});

module.exports = router;
