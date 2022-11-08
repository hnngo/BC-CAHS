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
  const { limit = 20, offset = 0 } = req.query;
  const data = await poolAsync(`
    SELECT sd.*, sad.*,
      string_agg(rqt.rt_qpcr_target, ',') rt_qpcr_type
    FROM public.submission_details sd
    LEFT JOIN public.sample_details sad ON sd.submission_num = sad.submission_num
    LEFT JOIN public.submission_rt_qpcr srq ON srq.submission_num = sad.submission_num
    LEFT JOIN public.rt_qpcr_targets rqt ON rqt.rt_qpcr_id = srq.rt_qpcr_id
    GROUP BY sd.submission_num, sad.sample_id
    ORDER BY sd.receive_date
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
  let data = req.body.data;
  // let data = sample_data;
  // data.submissionNum = "ABCD" + +Math.round(Math.random() * 10000).toString();

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
        '${data.otherDetails}');
        `;

      query += insert;
    });

    query += `END $$;`;
    await pool.query(query);
    res.json({
      error: 0,
      msg: "Successfully saved form data to database!",
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
 * Get status
 */
router.post("/status", async (req, res) => {
  const { submission_num } = req.body;

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
    // Check if status existed
    const queryCheck = await poolAsync(
      `SELECT count(*) FROM public.sample_status_information WHERE submission_num = '${data.submission_num}'`
    );

    if (queryCheck.rowCount == 0) {
      // Insert if not found
      pool.query(`INSERT INTO public.sample_status_information(
        cut_date, cut_date_initials, scale_verification_lower, scale_verification_upper, extraction_date, extraction_date_initials, recut_date, recut_date_initials, reextracted_date, reextracted_date_initials, reason_for_reextraction, qcpr_complete_date, positive_control_ct_lower, positive_control_ct_upper, negative_control_ct_lower, negative_control_ct_upper, submission_num)
        VALUES (
         '${data.cut_date}',
         '${data.cut_date_initials}',
         ${data.scale_verification_lower},
         ${data.scale_verification_upper},
         '${data.extraction_date}',
         '${data.extraction_date_initials}',
         '${data.recut_date}',
         '${data.recut_date_initials}',
         '${data.reextracted_date}',
         '${data.reextracted_date_initials}',
         '${data.reason_for_reextraction}',
         '${data.qcpr_complete_date}',
         ${data.positive_control_ct_lower},
         ${data.positive_control_ct_upper},
         ${data.negative_control_ct_lower},
         ${data.negative_control_ct_upper},
         '${data.submission_num}');`);
    } else {
      // Update if found
      pool.query(`
        UPDATE public.sample_status_information
        SET
          cut_date = '${data.cut_date}',
          cut_date_initials = '${data.cut_date_initials}', 
          scale_verification_lower = ${data.scale_verification_lower},
          scale_verification_upper = ${data.scale_verification_upper},
          extraction_date = '${data.extraction_date}',
          extraction_date_initials = '${data.extraction_date_initials}',
          recut_date = '${data.recut_date}',
          recut_date_initials = '${data.recut_date_initials}',
          reextracted_date = '${data.reextracted_date}',
          reextracted_date_initials = '${data.reextracted_date_initials}',
          reason_for_reextraction = '${data.reason_for_reextraction}',
          qcpr_complete_date = '${data.qcpr_complete_date}',
          positive_control_ct_lower = ${data.positive_control_ct_lower},
          positive_control_ct_upper = ${data.positive_control_ct_upper},
          negative_control_ct_lower = ${data.negative_control_ct_lower},
          negative_control_ct_upper = ${data.negative_control_ct_upper}
        WHERE submission_num = '${data.submission_num}';`);
    }
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

module.exports = router;
