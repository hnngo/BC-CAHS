const mapBEtoFE = Object.freeze({
  analysis_requested: "requestedAnalysis",
  bc_cahs_custodian_initials: "custodian",
  bc_cahs_pi: "PI",
  bc_cahs_project: "BCCAHSProject",
  bc_cahs_receiver_name: "receiver",
  client_case_num: "clientCaseNum",
  comment: "comment",
  company_name: "companyName",
  contact_phone_num: "contactPhoneNum",
  initial_storage: "initialStorage",
  num_of_samples: "sampleNum",
  rt_qpcr_type_other: "otherDescription",
  purchase_order_num: "clientPO",
  receive_date: "receiveDate",
  rt_qpcr_type: "rtqpcrTarget",
  sample_condition: "sampleCondition",
  sample_details: "sampleDetails",
  sample_origin: "sampleOrigin",
  sample_type: "sampleType",
  sampling_date: "samplingDate",
  sampling_location: "samplingLocation",
  species: "sampleSpecies",
  submission_num: "submissionNum",
  submit_time: "submitTime",
  submitter: "submitter"
});

export const generateDefaultSampleState = () => ({
  submissionNum: null,
  companyName: null,
  submitter: null,
  receiver: null,
  receiveDate: new Date().toISOString().substring(0, 10),
  submitTime: `${new Date().toISOString().replace(/T.*/, "")} ${new Date().toLocaleTimeString(
    "en-US",
    {
      hour12: false
    }
  )}`,
  clientPO: null,
  clientCaseNum: null,
  contactPhoneNum: null,
  samplingDate: new Date().toISOString().substring(0, 10),
  samplingLocation: null,
  custodian: null,
  PI: null,
  BCCAHSProject: null,
  initialStorage: null,
  sampleNum: null,
  sampleSpecies: null,
  sampleType: null,
  sampleOrigin: null,
  sampleCondition: null,
  sampleDetails: null,
  requestedAnalysis: null,
  rtqpcrTarget: null,
  otherDescription: null,
  comment: null
});

export const convertSampleField = (object) => {
  let convertedObject = {};
  Object.entries(object).forEach((entry) => {
    if (mapBEtoFE[entry[0]]) {
      if (entry[0] == "rt_qpcr_type") {
        convertedObject[mapBEtoFE[entry[0]]] = entry[1].split(",");
      } else if (entry[0] == "rt_qpcr_type_other") {
        convertedObject[mapBEtoFE[entry[0]]] = entry[1].split(",").filter(Boolean)[0];
      } else {
        convertedObject[mapBEtoFE[entry[0]]] = entry[1];
      }
    }
  });
  return convertedObject;
};
