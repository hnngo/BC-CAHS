const { application } = require("express");
const express = require("express");
const router = express.Router();
const pool = require("../database");

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

let testData = {
  submissionNum: "123ABC12",
  companyName: "Test Company",
  submitter: "Nick",
  receiver: "NL",
  receiveDate: "2022-10-27",
  submitTime: `${new Date()
    .toISOString()
    .replace(/T.*/, "")} ${new Date().toLocaleTimeString("en-US", {
    hour12: false,
  })}`,
  clientPO: "123123",
  clientCaseNum: "123123123",
  contactPhoneNum: "778-999-9999",
  samplingDate: "2022-10-27",
  samplingLocation: "Somewhere",
  custodian: "NL",
  PI: "NL",
  BCCAHSProject: "COMP4800..",
  initialStorage: "In my bed",
  sampleNum: 50,
  sampleSpecies: "Atlantic",
  sampleType: "Something something",
  sampleOrigin: "Freshwater",
  sampleCondition: "Frozen",
  otherDetails: null,
  requestedAnalysis: "ATPase",
  rtqpcrTarget: ["IHNv", "IPNv"],
};

router.post("/submit", async (req, res) => {
  try {
    let query = `
    DO $$ BEGIN
    INSERT INTO public.submission_details (submission_num, 
      company_name, submitter, receive_date, submit_time, sampling_location, sampling_date, contact_phone_num, 
      purchase_order_num, bc_cahs_receiver_name, bc_cahs_custodian_initials, client_case_num, bc_cahs_pi, 
      bc_cahs_project, initial_storage, analysis_requested) 
      VALUES(
        '${testData.submissionNum}', 
        '${testData.companyName}', 
        '${testData.submitter}', 
        '${testData.receiveDate}', 
        '${testData.submitTime}', 
        '${testData.samplingLocation}', 
        '${testData.samplingDate}', 
        '${testData.contactPhoneNum}', 
        '${testData.clientPO}', 
        '${testData.receiver}', 
        '${testData.custodian}', 
        '${testData.clientCaseNum}', 
        '${testData.PI}', 
        '${testData.BCCAHSProject}',
        '${testData.initialStorage}', 
        '${testData.requestedAnalysis}');

    INSERT INTO public.sample_details (num_of_samples, species, other_details, sample_type, sample_condition, sample_origin, submission_num)
    VALUES(
        ${testData.sampleNum}, 
        '${testData.sampleSpecies}', 
        '${testData.otherDetails}', 
        '${testData.sampleType}', 
        '${testData.sampleCondition}',
        '${testData.sampleOrigin}',
        '${testData.submissionNum}');
    END $$;
    `;

    await pool.query(query);

    testData.rtqpcrTarget.forEach(async (target) => {
      await pool.query(
        `DO $$ BEGIN
      INSERT INTO public.submission_rt_qpcr (rt_qpcr_id, sample_id, other_description)
      VALUES(
        '${await pool.query(
          `SELECT rt_qpcr_id FROM public.rt_qpcr_targets WHERE public.rt_qpcr_targets.rt_qpcr_target = ${target}`
        )}',
        '${testData.submissionNum}',
        '${testData.otherDetails}')
      END $$;
      `
      );
    });

    res.send("Succesfully written to database!");
  } catch (err) {
    res.status(400).send(`Error: ${err}`);
  }
});

module.exports = router;
