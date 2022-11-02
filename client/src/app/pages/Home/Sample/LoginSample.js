import React from "react";

import { Grid } from "@mui/material";
import SampleInput from "../components/SampleInput";

import { SAMPLE_CONDITION, SAMPLE_TYPE, ANALYSIS_REQUESTS, RT_QPCR_TARGETS } from "../constants";

const Sample = () => {
  const [submissionData, setSubmissionData] = React.useState({
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
    samplingDate: null,
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

  const onChangeValue = (name, value) => {
    setSubmissionData({ ...submissionData, [name]: value });
  };

  // const extractTime = (name, event) => {
  //   setSubmissionData({ ...submissionData, [name]: `${event.$H}:${event.$m}:${event.$s}` });
  // };
  console.log(submissionData);

  return (
    <Grid container direction={"row"}>
      <Grid item container direction={"column"} xs={6}>
        <SampleInput
          label={"Submission Details"}
          labelStyle={{ fontWeight: "bold", fontSize: "26px" }}
        />
        <SampleInput
          label={"Date Received at CAHS"}
          name="receiveDate"
          type="date"
          value={submissionData.receiveDate || ""}
          onChange={(e) => {
            onChangeValue("receiveDate", `${e.$y}-${e.$M + 1}-${e.$D}`);
          }}
        />
        <SampleInput
          label={"Time Submitted"}
          name="submitTime"
          type="time"
          value={submissionData.submitTime || ""}
          onChange={(e) => onChangeValue("submitTime", e)}
          // onChange={(e) => onChangeValue("submitTime", e)}
        />

        <SampleInput
          label={"BC CAHS Receiver"}
          name="receiver"
          type="text"
          onChange={(e) => onChangeValue(e.target.name, e.target.value)}
        />
        <SampleInput
          label={"BC CAHS Submission #"}
          name="submissionNum"
          type="text"
          onChange={(e) => onChangeValue(e.target.name, e.target.value)}
        />
        <br />
        <br />
        <SampleInput
          label={"Company"}
          name="companyName"
          type="text"
          onChange={(e) => onChangeValue(e.target.name, e.target.value)}
        />
        <SampleInput
          label={"Submitter"}
          name="submitter"
          type="text"
          onChange={(e) => onChangeValue(e.target.name, e.target.value)}
        />
        <SampleInput
          label={"Contact Phone #"}
          name="contactPhoneNum"
          type="text"
          onChange={(e) => onChangeValue(e.target.name, e.target.value)}
        />
        <SampleInput
          label={"PO #"}
          name="clientPO"
          type="text"
          onChange={(e) => onChangeValue(e.target.name, e.target.value)}
        />
        <SampleInput
          label={"Client Case #"}
          name="clientCaseNum"
          type="text"
          onChange={(e) => onChangeValue(e.target.name, e.target.value)}
        />
        <SampleInput
          label={"Sampling Date"}
          name="samplingDate"
          type="date"
          onChange={(e) => {
            onChangeValue("samplingDate", `${e.$y}-${e.$M + 1}-${e.$D}`);
          }}
        />
        <SampleInput
          label={"Sampling Location"}
          name="samplingLocation"
          type="text"
          onChange={(e) => onChangeValue(e.target.name, e.target.value)}
        />
        <br />
        <br />
        <SampleInput
          label={"BC CAHS Custodian"}
          name="custodian"
          type="text"
          onChange={(e) => onChangeValue(e.target.name, e.target.value)}
        />
        <SampleInput
          label={"BC CAHS P.I."}
          name="PI"
          type="text"
          onChange={(e) => onChangeValue(e.target.name, e.target.value)}
        />
        <SampleInput
          label={"BC CAHS Project"}
          name="BCCAHSProject"
          type="text"
          onChange={(e) => onChangeValue(e.target.name, e.target.value)}
        />
        <SampleInput
          label={"Initial Storage"}
          name="initialStorage"
          type="text"
          onChange={(e) => onChangeValue(e.target.name, e.target.value)}
        />
      </Grid>
      <Grid item container direction={"column"} xs={6}>
        <SampleInput
          label={"Sample Detail"}
          labelStyle={{ fontWeight: "bold", fontSize: "26px" }}
        />
        <SampleInput
          label={"# of Samples"}
          name="sampleNum"
          type="text"
          onChange={(e) => onChangeValue(e.target.name, e.target.value)}
        />
        <SampleInput
          label={"Sample Species"}
          name="sampleSpecies"
          type="text"
          onChange={(e) => onChangeValue(e.target.name, e.target.value)}
        />
        <SampleInput
          label={"Sample Type"}
          name="sampleType"
          type="text"
          onChange={(e) => onChangeValue(e.target.name, e.target.value)}
        />
        <SampleInput
          label={"Sample Origin"}
          name="sampleOrigin"
          value={"wild" || submissionData.sampleOrigin}
          type="select"
          options={SAMPLE_TYPE}
          onChange={(e) => onChangeValue("sampleOrigin", e.target.value)}
        />
        <SampleInput
          label={"Sample Condition"}
          name="sampleCondition"
          type="select"
          options={SAMPLE_CONDITION}
          value={"dryIce" || submissionData.sampleCondition}
          onChange={(e) => onChangeValue("sampleCondition", e.target.value)}
        />
        <SampleInput
          label={"Sample Details"}
          name="sampleDetails"
          type="text"
          onChange={(e) => onChangeValue(e.target.name, e.target.value)}
        />
        <br />
        <br />
        <SampleInput
          label={"Analysis Requested"}
          labelStyle={{ fontWeight: "bold", fontSize: "26px" }}
        />
        {/* <SampleInput label={"Research/Diagnostic"} name="research" type="text" /> */}
        <SampleInput
          label={"Analysis Requested"}
          name="requestedAnalysis"
          value={submissionData.requestedAnalysis || ""}
          type="multi-select"
          options={ANALYSIS_REQUESTS}
          onChange={(e) => onChangeValue("requestedAnalysis", e.target.value)}
        />
        <SampleInput
          label={"RT-qPCR Targets"}
          name="rtqpcrTarget"
          value={submissionData.rtqpcrTarget || ""}
          type="multi-select"
          options={RT_QPCR_TARGETS}
          onChange={(e) => onChangeValue("rtqpcrTarget", e.target.value)}
        />
        <SampleInput
          name="rtqpcrTargets_other"
          type="text"
          disableText
          placeholder={"If other, please specify"}
        />
        <br />
        <br />
        <SampleInput
          label={"Comment"}
          name="comment"
          placeholder="Optional Comments"
          type="text-area"
          onChange={(e) => onChangeValue("comment", e.target.value)}
        />
        <br />
        <br />
        <SampleInput label="" name="submit" type="submit" />
      </Grid>
    </Grid>
  );
};

export default Sample;
