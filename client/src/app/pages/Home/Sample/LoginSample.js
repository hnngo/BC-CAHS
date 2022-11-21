import React, { useState } from "react";

// Hooks
import { useSearchParams } from "react-router-dom";

// API
import {
  apiGetFormBySubmissionNumber,
  apiUpdateFormBySubmissionNumber,
  apiSubmitForm
} from "../../../api/form";

// Components
import { Grid, Modal, Box } from "@mui/material";
import SampleInput from "../components/SampleInput";

// Constants and Utils
import { SAMPLE_CONDITION, SAMPLE_TYPE, ANALYSIS_REQUESTS, RT_QPCR_TARGETS } from "../constants";
import {
  validateDate,
  validateTime,
  validateText,
  validateTextNum
} from "../../../utils/validator";
import { generateDefaultSampleState, convertSampleField } from "./utils/sampleFieldConversion";
import { API_PROGRESS } from "../../../utils/constants";

// Theme
import { useTheme } from "@mui/material/styles";

const Sample = () => {
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [apiProgress, setApiProgress] = React.useState({
    progress: API_PROGRESS.INIT,
    error: 0,
    msg: " "
  });
  const [submissionData, setSubmissionData] = React.useState(generateDefaultSampleState());

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

  const [otherDisabled, setOtherDisabled] = useState(true);

  const fetchFormBySubmissionNum = async (submissionNum) => {
    try {
      const { error, data } = await apiGetFormBySubmissionNumber(submissionNum);
      if (!error && data && data.length == 1) {
        setSubmissionData(convertSampleField(data[0]));
        setSubmissionErrors({});
      }
    } catch (error) {
      console.log(error);
      //
    }
  };

  // Fetch existed form for Editing purposes
  React.useEffect(() => {
    const editMode = searchParams.get("edit");
    const selectedSubmissionNum = searchParams.get("submission_num");

    if (editMode == "true" && selectedSubmissionNum) {
      fetchFormBySubmissionNum(selectedSubmissionNum);
    } else {
      setSubmissionData(generateDefaultSampleState());
    }
  }, [searchParams]);

  React.useEffect(() => {
    if (submissionData.rtqpcrTarget && submissionData.rtqpcrTarget.includes("other")) {
      setOtherDisabled(false);
    }
  }, [submissionData.rtqpcrTarget]);

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
      delete submissionErrors[name];
    }
    setSubmissionData({ ...submissionData, [name]: value });
  };

  const onChangeTextValueNum = (name, value) => {
    const error = validateTextNum(name, value);
    if (error.length) {
      setSubmissionErrors({ ...submissionErrors, [name]: error });
    } else {
      delete submissionErrors[name];
    }
    setSubmissionData({ ...submissionData, [name]: value });
  };

  const onChangeTimeValue = (name, value) => {
    const error = validateTime(name, value);
    if (error.length) {
      setSubmissionErrors({ ...submissionErrors, [name]: error });
    } else {
      delete submissionErrors[name];
    }
    setSubmissionData({ ...submissionData, [name]: value });
  };

  const onChangeDateValue = (name, value) => {
    const error = validateDate(name, value);

    if (error.length) {
      setSubmissionErrors({ ...submissionErrors, [name]: error });
    } else {
      delete submissionErrors[name];
    }
    setSubmissionData({ ...submissionData, [name]: value });
  };

  const onChangeSelectValue = (name, value) => {
    if (value) {
      delete submissionErrors[name];
    } else {
      setSubmissionErrors({ ...submissionErrors, [name]: "Please select an option" });
    }
    setSubmissionData({ ...submissionData, [name]: value });
  };

  const onChangeMultiSelectValue = (name, value) => {
    if (value) {
      delete submissionErrors[name];
    } else {
      setSubmissionErrors({ ...submissionErrors, [name]: "Please select an option" });
    }
    setSubmissionData({ ...submissionData, [name]: value });
  };

  const submitData = async () => {
    if (Object.keys(submissionErrors).length == 0) {
      let res;
      if (searchParams.get("edit") == "true") {
        res = await apiUpdateFormBySubmissionNumber(submissionData);
      } else {
        res = await apiSubmitForm(submissionData);
      }

      if (res.error || !res.data) {
        setApiProgress({ error: res.error, msg: res.msg, progress: API_PROGRESS.FAILED });
      } else {
        setApiProgress({
          error: 0,
          msg: res.msg || "Submit form status successfully",
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
          value={submissionData.receiver || ""}
          onChange={(e) => onChangeTextValue(e.target.name, e.target.value)}
        />
        <SampleInput
          label={"BC CAHS Submission #"}
          name="submissionNum"
          type="text"
          disableText={searchParams.get("edit") == "true"}
          value={submissionData.submissionNum || ""}
          onChange={(e) => onChangeTextValue(e.target.name, e.target.value)}
        />
        <br />
        <br />
        <SampleInput
          label={"Company"}
          name="companyName"
          type="text"
          value={submissionData.companyName || ""}
          onChange={(e) => onChangeTextValue(e.target.name, e.target.value)}
        />
        <SampleInput
          label={"Submitter"}
          name="submitter"
          type="text"
          value={submissionData.submitter || ""}
          onChange={(e) => onChangeTextValue(e.target.name, e.target.value)}
        />
        <SampleInput
          label={"Contact Phone #"}
          name="contactPhoneNum"
          type="text"
          value={submissionData.contactPhoneNum || ""}
          onChange={(e) => onChangeTextValue(e.target.name, e.target.value)}
        />
        <SampleInput
          label={"PO #"}
          name="clientPO"
          type="text"
          value={submissionData.clientPO || ""}
          onChange={(e) => onChangeTextValue(e.target.name, e.target.value)}
        />
        <SampleInput
          label={"Client Case #"}
          name="clientCaseNum"
          type="text"
          value={submissionData.clientCaseNum || ""}
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
          value={submissionData.samplingLocation || ""}
          onChange={(e) => onChangeTextValue(e.target.name, e.target.value)}
        />
        <br />
        <br />
        <SampleInput
          label={"BC CAHS Custodian"}
          name="custodian"
          type="text"
          value={submissionData.custodian || ""}
          onChange={(e) => onChangeTextValue(e.target.name, e.target.value)}
        />
        <SampleInput
          label={"BC CAHS P.I."}
          name="PI"
          type="text"
          value={submissionData.PI || ""}
          onChange={(e) => onChangeTextValue(e.target.name, e.target.value)}
        />
        <SampleInput
          label={"BC CAHS Project"}
          name="BCCAHSProject"
          type="text"
          value={submissionData.BCCAHSProject || ""}
          onChange={(e) => onChangeTextValue(e.target.name, e.target.value)}
        />
        <SampleInput
          label={"Initial Storage"}
          name="initialStorage"
          type="text"
          value={submissionData.initialStorage || ""}
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
          value={submissionData.sampleNum || ""}
          onChange={(e) => onChangeTextValueNum(e.target.name, e.target.value)}
        />
        <SampleInput
          label={"Sample Species"}
          name="sampleSpecies"
          type="text"
          value={submissionData.sampleSpecies || ""}
          onChange={(e) => onChangeTextValue(e.target.name, e.target.value)}
        />
        <SampleInput
          label={"Sample Type"}
          name="sampleType"
          type="text"
          value={submissionData.sampleType || ""}
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
          value={submissionData.sampleDetails || ""}
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
          value={submissionData.rtqpcrTarget || []}
          type="multi-select"
          options={RT_QPCR_TARGETS}
          onSelectionUpdate={(e) => onChangeMultiSelectValue("rtqpcrTarget", e.target.value)}
        />
        <SampleInput
          name="otherDescription"
          type="text"
          disableText={otherDisabled}
          placeholder={"If other, please specify"}
          onChange={(e) => onChangeTextValue(e.target.name, e.target.value)}
        />
        <br />
        <br />
        <SampleInput
          label={"Comment"}
          name="comment"
          placeholder="Optional Comments"
          type="text-area"
          value={submissionData.comment || ""}
          onChange={(e) => onChangeTextValue("comment", e.target.value)}
        />
        <br />
        <br />
        <SampleInput
          label=""
          name="submit"
          type="submit"
          submitText={searchParams.get("edit") == "true" ? "Update" : "Submit"}
          onClick={() => submitData()}
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
