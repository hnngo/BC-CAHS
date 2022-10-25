import React from "react";

import { Grid } from "@mui/material";
import SampleInput from "./components/SampleInput";

import { SAMPLE_CONDITION, SAMPLE_TYPE, ANALYSIS_REQUESTS, RT_QPCR_TARGETS } from "./constants";

const Sample = () => {
  return (
    <Grid container direction={"row"}>
      <Grid item container direction={"column"} xs={6}>
        <SampleInput
          label={"Submission Details"}
          labelStyle={{ fontWeight: "bold", fontSize: "26px" }}
        />
        <SampleInput label={"Date Received at CAHS"} name="dateReceive" type="text" />
        <SampleInput label={"Time Received at CAHS"} name="timeReceive" type="text" />
        <SampleInput label={"BC CAHS Receiver"} name="receiver" type="text" />
        <SampleInput label={"BC CAHS Submission #"} name="submissionNumber" type="text" />
        <br />
        <br />
        <SampleInput label={"Company"} name="company" type="text" />
        <SampleInput label={"Submitter"} name="submitter" type="text" />
        <SampleInput label={"Contact Phone #"} name="contactPhoneNumber" type="text" />
        <SampleInput label={"PO #"} name="poNumber" type="text" />
        <SampleInput label={"Client Case #"} name="clientCaseNumber" type="text" />
        <SampleInput label={"Sampling Date"} name="samplingDate" type="text" />
        <SampleInput label={"Sampling Location"} name="samplingLocation" type="text" />
        <br />
        <br />
        <SampleInput label={"BC CAHS Custodian"} name="custodian" type="text" />
        <SampleInput label={"BC CAHS P.I."} name="pi" type="text" />
        <SampleInput label={"BC CAHS Projcet"} name="project" type="text" />
        <SampleInput label={"Initial Storage"} name="receiveBy" type="text" />
      </Grid>
      <Grid item container direction={"column"} xs={6}>
        <SampleInput
          label={"Sample Detail"}
          labelStyle={{ fontWeight: "bold", fontSize: "26px" }}
        />
        <SampleInput label={"# of Samples"} name="numberOfSample" type="text" />
        <SampleInput label={"Sample Species"} name="sampleSpecies" type="text" />
        <SampleInput label={"Sample Type"} name="sampleType" type="text" />
        <SampleInput
          label={"Sample Origin"}
          name="sampleType"
          type="select"
          options={SAMPLE_TYPE}
        />
        <SampleInput
          label={"Sample Condition"}
          name="sampleCondition"
          type="select"
          options={SAMPLE_CONDITION}
        />
        <SampleInput label={"Sample Details"} name="sampleDetails" type="text" />
        <br />
        <br />
        <SampleInput
          label={"Analysis Requested"}
          labelStyle={{ fontWeight: "bold", fontSize: "26px" }}
        />
        <SampleInput label={"Research/Diagnostic"} name="research" type="text" />
        <SampleInput
          label={"Analysis Requested"}
          name="analysisRequested"
          type="multi-select"
          options={ANALYSIS_REQUESTS}
        />
        <SampleInput
          label={"RT-qPCR Targets"}
          name="rtqpcrTargets"
          type="multi-select"
          options={RT_QPCR_TARGETS}
        />
        <SampleInput
          name="rtqpcrTargets_other"
          type="text"
          disableText
          placeholder={"If other, please specify"}
        />
        <SampleInput label={"Comment"} name="comment" type="text-area" />
        <br />
        <br />
        <SampleInput label="" name="submit" type="submit" />
      </Grid>
    </Grid>
  );
};

export default Sample;
