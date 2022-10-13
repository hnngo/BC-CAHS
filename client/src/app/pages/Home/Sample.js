import React from "react";

import { Grid } from "@mui/material";
import SampleInput from "./components/SampleInput";

const Sample = () => {
  return (
    <Grid container direction={"row"}>
      <Grid item container direction={"column"} xs={6}>
        <SampleInput label={"Date Received at CAHS"} name="dateReceive" />
        <SampleInput label={"Time Received at CAHS"} name="timeReceive" />
        <SampleInput label={"Received by"} name="receiveBy" />
        <br />
        <br />
        <br />
        <br />
        <SampleInput label={"CAHS Submission #"} name="submissionNumber" />
        <br />
        <br />
        <SampleInput label={"Client"} name="submissionNumber" />
        <SampleInput label={"Submitter"} name="submissionNumber" />
        <SampleInput label={"Contact Phone #"} name="submissionNumber" />
        <SampleInput label={"PO #"} name="submissionNumber" />
        <SampleInput label={"Case #"} name="submissionNumber" />
        <SampleInput label={"Sampling Date"} name="submissionNumber" />
        <br />
        <br />
        <SampleInput label={"# of Samples"} name="submissionNumber" />
        <SampleInput label={"Sample Type"} name="submissionNumber" />
        <SampleInput label={"Sample Details"} name="submissionNumber" />
      </Grid>
      <Grid item container direction={"column"} xs={6}>
        <SampleInput label={"Custodian"} name="dateReceive" />
        <SampleInput label={"P.I"} name="timeReceive" />
        <SampleInput label={"Initial Storage"} name="receiveBy" />
        <br />
        <br />
        <br />
        <br />
        <SampleInput label={"Research/Diagnostic"} name="research" type="select" />
        <SampleInput label={"Analysis Requested"} name="analysisRequested" type="select" />
        <SampleInput label={"RT-qPCR Targets"} name="rtqpcrTargets" type="select" />
        <SampleInput label={"Comment"} name="comment" type="text-area" />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <SampleInput label="" name="submit" type="submit" />
      </Grid>
    </Grid>
  );
};

export default Sample;
