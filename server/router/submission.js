const { application } = require("express");
const express = require("express");
const router = express.Router();
const pool = require("../database");

/**
 * Connect with Pool.
 */
(async () => {
  let client = await pool.connect();
})();

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

router.use(
  session({
    secret: "thisIsMySecreteCode",
    saveUninitialized: true,
    cookie: { maxAge: cookieTTL },
    resave: false,
  })
);

let testData = {
  submissionNum: "123ABC",
  companyName: "Test Company",
  submitter: "Nick",
  receiver: "NL",
  receiveDate: "2022-10-27",
  receiveTime: new Date().toLocaleTimeString(),
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
  sampleOrigin: "Freswater",
  sampleCondition: "Frozen",
  otherDetails: "blah blah blah",
  requestedAnalysis: "ATPase",
  rtqpcrTarget: ["IHNv", "IPNv"],
};

router.post("/form/submit", (req, res) => {});
