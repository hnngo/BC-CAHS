import React, { useState } from "react";

import { Grid, Modal, Box } from "@mui/material";
import SampleInput from "../components/SampleInput";
import { SAMPLE_CONDITION, SAMPLE_TYPE, ANALYSIS_REQUESTS, RT_QPCR_TARGETS } from "../constants";
import axios from "axios";
import {
  validateDate,
  validateTime,
  validateText,
  validateTextNum
} from "../../../utils/validator";
import { API_PROGRESS } from "../../../utils/constants";

import { useTheme } from "@mui/material/styles";

const Sample = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [apiProgress, setApiProgress] = React.useState({
    progress: API_PROGRESS.INIT,
    error: 0,
    msg: " "
  });
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
    submissionNum: "Please fill in field.",
    companyName: "Please fill in field.",
    submitter: "Please fill in field.",
    receiver: "Please fill in field.",
    clientPO: "Please fill in field.",
    clientCaseNum: "Please fill in field.",
    contactPhoneNum: "Please fill in field.",
    samplingLocation: "Please fill in field.",
    custodian: "Please fill in field.",
    PI: "Please fill in field.",
    BCCAHSProject: "Please fill in field.",
    initialStorage: "Please fill in field.",
    sampleNum: "Please fill in field.",
    sampleSpecies: "Please fill in field.",
    sampleType: "Please fill in field.",
    sampleOrigin: "Please fill in field.",
    sampleCondition: "Please fill in field.",
    requestedAnalysis: "Please fill in field.",
    rtqpcrTarget: "Please fill in field."
  });

  const handleClose = () => {
    setOpen(false);
    setApiProgress({
      progress: API_PROGRESS.INIT,
      error: 0,
      msg: " "
    });
  };

  const onChangeTextValue = (name, value) => {
    const error = validateText(name, value);
    if (error.length) {
      setSubmissionErrors({ ...submissionErrors, [name]: error });
    } else {
      setSubmissionData({ ...submissionData, [name]: value });
      delete submissionErrors[name];
    }
  };

  const onChangeTextValueNum = (name, value) => {
    const error = validateTextNum(name, value);
    console.log(error);
    if (error.length) {
      setSubmissionErrors({ ...submissionErrors, [name]: error });
    } else {
      setSubmissionData({ ...submissionData, [name]: value });
      delete submissionErrors[name];
    }
  };

  const onChangeTimeValue = (name, value) => {
    const error = validateTime(name, value);
    if (error.length) {
      setSubmissionErrors({ ...submissionErrors, [name]: error });
    } else {
      setSubmissionData({ ...submissionData, [name]: value });
    }
  };

  const onChangeDateValue = (name, value) => {
    const error = validateDate(name, value);

    if (error.length) {
      setSubmissionErrors({ ...submissionErrors, [name]: error });
    } else {
      setSubmissionData({ ...submissionData, [name]: value });
    }
  };

  const onChangeSelectValue = (name, value) => {
    setSubmissionData({ ...submissionData, [name]: value });
    delete submissionErrors[name];
  };

  const onChangeMultiSelectValue = (name, value) => {
    setSubmissionData({ ...submissionData, [name]: value });
    delete submissionErrors[name];
  };

  const submitData = async (data) => {
    if (Object.keys(submissionErrors).length == 0) {
      const res = await axios.post(
        "http://localhost:8000/api/form/submit",
        { data: data },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
      if (!res.data || !res.data.data || res.data.error) {
        setApiProgress({ error: res.data.error, msg: res.data.msg, progress: API_PROGRESS.FAILED });
      } else {
        setApiProgress({
          error: 0,
          msg: "Submit form status successfully",
          progress: API_PROGRESS.SUCCESS
        });
        setSubmissionErrors({});
      }
    }
    setOpen(true);
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
            onChangeDateValue("receiveDate", e);
          }}
        />

        <SampleInput
          label={"Time Submitted"}
          name="submitTime"
          type="time"
          value={submissionData.submitTime || ""}
          onChange={(e) => onChangeTimeValue("submitTime", e)}
        />

        <SampleInput
          label={"BC CAHS Receiver"}
          name="receiver"
          type="text"
          onChange={(e) => onChangeTextValue(e.target.name, e.target.value)}
        />
        <SampleInput
          label={"BC CAHS Submission #"}
          name="submissionNum"
          type="text"
          onChange={(e) => onChangeTextValue(e.target.name, e.target.value)}
        />
        <br />
        <br />
        <SampleInput
          label={"Company"}
          name="companyName"
          type="text"
          onChange={(e) => onChangeTextValue(e.target.name, e.target.value)}
        />
        <SampleInput
          label={"Submitter"}
          name="submitter"
          type="text"
          onChange={(e) => onChangeTextValue(e.target.name, e.target.value)}
        />
        <SampleInput
          label={"Contact Phone #"}
          name="contactPhoneNum"
          type="text"
          onChange={(e) => onChangeTextValue(e.target.name, e.target.value)}
        />
        <SampleInput
          label={"PO #"}
          name="clientPO"
          type="text"
          onChange={(e) => onChangeTextValue(e.target.name, e.target.value)}
        />
        <SampleInput
          label={"Client Case #"}
          name="clientCaseNum"
          type="text"
          onChange={(e) => onChangeTextValue(e.target.name, e.target.value)}
        />
        <SampleInput
          label={"Sampling Date"}
          name="samplingDate"
          type="date"
          value={submissionData.samplingDate || ""}
          onChange={(e) => {
            onChangeDateValue("samplingDate", e);
          }}
        />
        <SampleInput
          label={"Sampling Location"}
          name="samplingLocation"
          type="text"
          onChange={(e) => onChangeTextValue(e.target.name, e.target.value)}
        />
        <br />
        <br />
        <SampleInput
          label={"BC CAHS Custodian"}
          name="custodian"
          type="text"
          onChange={(e) => onChangeTextValue(e.target.name, e.target.value)}
        />
        <SampleInput
          label={"BC CAHS P.I."}
          name="PI"
          type="text"
          onChange={(e) => onChangeTextValue(e.target.name, e.target.value)}
        />
        <SampleInput
          label={"BC CAHS Project"}
          name="BCCAHSProject"
          type="text"
          onChange={(e) => onChangeTextValue(e.target.name, e.target.value)}
        />
        <SampleInput
          label={"Initial Storage"}
          name="initialStorage"
          type="text"
          onChange={(e) => onChangeTextValue(e.target.name, e.target.value)}
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
          onChange={(e) => onChangeTextValueNum(e.target.name, e.target.value)}
        />
        <SampleInput
          label={"Sample Species"}
          name="sampleSpecies"
          type="text"
          onChange={(e) => onChangeTextValue(e.target.name, e.target.value)}
        />
        <SampleInput
          label={"Sample Type"}
          name="sampleType"
          type="text"
          onChange={(e) => onChangeTextValue(e.target.name, e.target.value)}
        />
        <SampleInput
          label={"Sample Origin"}
          name="sampleOrigin"
          value={submissionData.sampleOrigin || ""}
          type="select"
          options={SAMPLE_TYPE}
          onChange={(e) => onChangeSelectValue("sampleOrigin", e.target.value)}
        />
        <SampleInput
          label={"Sample Condition"}
          name="sampleCondition"
          type="select"
          options={SAMPLE_CONDITION}
          value={submissionData.sampleCondition || ""}
          onChange={(e) => onChangeSelectValue("sampleCondition", e.target.value)}
        />
        <SampleInput
          label={"Sample Details"}
          name="sampleDetails"
          type="text"
          onChange={(e) => onChangeTextValue(e.target.name, e.target.value)}
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
          onChange={(e) => onChangeSelectValue("requestedAnalysis", e.target.value)}
        />
        <SampleInput
          label={"RT-qPCR Targets"}
          name="rtqpcrTarget"
          value={submissionData.rtqpcrTarget || ""}
          type="multi-select"
          options={RT_QPCR_TARGETS}
          onSelectionUpdate={(e) => onChangeMultiSelectValue("rtqpcrTarget", e.target.value)}
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
          onChange={(e) => onChangeTextValue("comment", e.target.value)}
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
            width: "35rem",
            bgcolor: theme.primary.lighter,
            border: "1px solid #000",
            boxShadow: 24,
            borderRadius: "5px",
            p: 4
          }}>
          {Object.entries(submissionErrors).map((e, i) => (
            <Grid key={i} container>
              <Grid item xs={6} style={{ fontWeight: "bold" }}>{`${e[0]}: `}</Grid>
              <Grid item xs={6}>{`${e[1]}`}</Grid>
            </Grid>
          ))}

          <div>{apiProgress.msg}</div>
        </Box>
      </Modal>
    </Grid>
  );
};

export default Sample;
