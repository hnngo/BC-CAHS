import React, { useState } from "react";
import { Grid, Modal, Box, Typography } from "@mui/material";
import SampleInput from "../components/SampleInput";
import { SAMPLE_CONDITION, SAMPLE_TYPE, ANALYSIS_REQUESTS, RT_QPCR_TARGETS } from "../constants";
import axios from "axios";
// import { validateDate } from "../../../utils/validateFormSubmission";
import { useTheme } from "@mui/material/styles";

const Sample = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
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

  const [submissionErrors, setSubmissionErrors] = useState({
    submissionNum: "hello",
    companyName: "",
    submitter: "",
    receiver: "",
    receiveDate: "",
    submitTime: "",
    clientPO: "",
    clientCaseNum: "",
    contactPhoneNum: "",
    samplingDate: "",
    samplingLocation: "",
    custodian: "",
    PI: "",
    BCCAHSProject: "",
    initialStorage: "",
    sampleNum: "",
    sampleSpecies: "",
    sampleType: "",
    sampleOrigin: "",
    sampleCondition: "",
    sampleDetails: "",
    requestedAnalysis: "",
    rtqpcrTarget: ""
  });

  const onChangeValue = (name, value) => {
    setSubmissionData({ ...submissionData, [name]: value });
  };

  const validateDate = (name, field) => {
    let regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (field == null || field.length == 0) {
      setSubmissionErrors({ ...submissionErrors, [name]: "Receive Date: Date is required." });
    } else if (field.length > 0 && !field.match(regEx)) {
      setSubmissionErrors({
        ...submissionErrors,
        [name]: "Receive Date: Date must match mm/dd/yyyy format."
      });
    }
  };

  const validateTime = (name, field) => {
    if (field == null || field.length == 0) {
      setSubmissionErrors({ ...submissionErrors, [name]: "Time Submitted: Time is required." });
    } else if (field.$d.toString() == "Invalid Date") {
      setSubmissionErrors({
        ...submissionErrors,
        [name]: "Time Submitted: Time must match hh:mm AM/PM format."
      });
    }
  };

  const submitData = async (data) => {
    validateDate("receiveDate", data.receiveDate);
    validateTime("time", data.submitTime);

    if (Object.keys(submissionErrors).length == 0) {
      await axios.post(
        "http://localhost:8000/api/form/submit",
        { data: data },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    } else {
      setOpen(true);
    }
  };

  return (
    <Grid container direction={"row"}>
      <Grid item container direction={"column"} xs={6}>
        <SampleInput
          label={"Submission Details"}
          labelStyle={{ fontWeight: "bold", fontSize: "26px" }}
        />
        <div></div>
        <SampleInput
          label={"Date Received at CAHS"}
          name="receiveDate"
          type="date"
          value={submissionData.receiveDate || ""}
          onChange={(e) => {
            onChangeValue("receiveDate", e);
          }}
        />

        <SampleInput
          label={"Time Submitted"}
          name="submitTime"
          type="time"
          value={submissionData.submitTime || ""}
          onChange={(e) => onChangeValue("submitTime", e)}
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
          required={true}
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
          value={submissionData.samplingDate || ""}
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
          value={submissionData.sampleOrigin || ""}
          type="select"
          options={SAMPLE_TYPE}
          onChange={(e) => onChangeValue("sampleOrigin", e.target.value)}
        />
        <SampleInput
          label={"Sample Condition"}
          name="sampleCondition"
          type="select"
          options={SAMPLE_CONDITION}
          value={submissionData.sampleCondition || ""}
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
        <SampleInput
          label={"Analysis Requested"}
          name="requestedAnalysis"
          value={submissionData.requestedAnalysis || ""}
          type="select"
          options={ANALYSIS_REQUESTS}
          onChange={(e) => onChangeValue("requestedAnalysis", e.target.value)}
        />
        <SampleInput
          label={"RT-qPCR Targets"}
          name="rtqpcrTarget"
          value={submissionData.rtqpcrTarget || ""}
          type="multi-select"
          options={RT_QPCR_TARGETS}
          onSelectionUpdate={(e) => onChangeValue("rtqpcrTarget", e.target.value)}
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
        <SampleInput
          label=""
          name="submit"
          type="submit"
          onClick={() => submitData(submissionData)}
        />
      </Grid>
      <Modal open={open} onClose={handleClose} sx={{ zIndex: 80 }}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "auto",
            bgcolor: theme.primary.lighter,
            border: "2px solid #000",
            boxShadow: 24,
            borderRadius: "12px",
            p: 4
          }}>
          {Object.values(submissionErrors).map((e, i) => (
            <div key={i}>{e}</div>
          ))}
        </Box>
      </Modal>
    </Grid>
  );
};

export default Sample;
