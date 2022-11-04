const sample_data = {
  submissionNum: "123ABC123",
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
  sampleOrigin: "freshWater",
  sampleCondition: "frozen",
  sampleDetails: null,
  requestedAnalysis: "atpase",
  rtqpcrTarget: ["ihnv", "ipnv"],
  otherDescription: "asdf",
  comment: "hello",
};

const sample_status = {
  sample_status_id: 1,
  cut_date: `${new Date()
    .toISOString()
    .replace(/T.*/, "")} ${new Date().toLocaleTimeString("en-US", {
    hour12: false,
  })}`,
  cut_date_initials: "Nhan",
  scale_verification_lower: 123.123,
  scale_verification_upper: 123.123,
  extraction_date: `${new Date()
    .toISOString()
    .replace(/T.*/, "")} ${new Date().toLocaleTimeString("en-US", {
    hour12: false,
  })}`,
  extraction_date_initials: "Nhan",
  recut_date: `${new Date()
    .toISOString()
    .replace(/T.*/, "")} ${new Date().toLocaleTimeString("en-US", {
    hour12: false,
  })}`,
  recut_date_initials: "Nhan",
  reextracted_date: `${new Date()
    .toISOString()
    .replace(/T.*/, "")} ${new Date().toLocaleTimeString("en-US", {
    hour12: false,
  })}`,
  reextracted_date_initials: "Nhan",
  reason_for_reextraction: "Reason Extraction",
  qcpr_complete_date: `${new Date()
    .toISOString()
    .replace(/T.*/, "")} ${new Date().toLocaleTimeString("en-US", {
    hour12: false,
  })}`,
  positive_control_ct_lower: 123.1,
  positive_control_ct_upper: 123.1,
  negative_control_ct_lower: 123.1,
  negative_control_ct_upper: 123.1,
  submission_num: "123ABC123",
};

module.exports = {
  sample_data,
  sample_status,
};
