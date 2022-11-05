import React from "react";

// Components
import SampleInput from "../../components/SampleInput";
import { Modal, Box, Typography, FormControl, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EditSampleDialog from "./EditSampleDialog";
import CloseIcon from "@mui/icons-material/Close";

// Constants
import { SAMPLE_STATUS } from "../../constants";
import { API_PROGRESS } from "../../../../utils/constants";

// Utils
import axios from "axios";
import { validate, VALIDATE_TYPES } from "../../../../utils/validator";

const EditSample = ({ isOpen, onClose, submissionNum }) => {
  const theme = useTheme();
  const [formData, setFormData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [apiProgress, setApiProgress] = React.useState({
    progress: API_PROGRESS.INIT,
    error: 0,
    msg: ""
  });

  const fetchFormStatus = async () => {
    try {
      // NOTE: Using fake submission number for now
      const res = await axios.post("http://localhost:8000/api/form/status", {
        submission_num: "123ABC123"
      });
      if (!res || !res.data || !res.data.data) {
        // New form status
      } else {
        setFormData({ ...res.data.data });
      }
    } catch (error) {
      // Show error
    }
  };

  // Fetch form status
  React.useEffect(() => {
    submissionNum && fetchFormStatus();
  }, [submissionNum]);

  // Return nothing if no data provided
  if (!submissionNum) {
    return;
  }

  const onChangeInput = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const onChangeDoulbeInput = (field, target) => {
    const validateErrors = validate(target.value, [VALIDATE_TYPES.NUMBER_ONLY]);
    if (validateErrors.length) {
      setErrors({ ...errors, [field]: validateErrors[0] });
    } else {
      setErrors({ ...errors, [field]: null });
    }

    if (target.name.endsWith("_lower")) {
      formData[field + "_lower"] = target.value;
    } else {
      formData[field + "_upper"] = target.value;
    }
    onChangeInput(field, formData[field]);
  };

  const updateDecimalNumbers = (field, decimalPoints = 0) => {
    if (errors[field]) {
      return;
    }

    let lower = "";
    let upper = "";
    if (formData[field + "_lower"]) {
      lower = (+formData[field + "_lower"]).toFixed(decimalPoints);
    }
    if (formData[field + "_upper"]) {
      upper = (+formData[field + "_upper"]).toFixed(decimalPoints);
    }
    setFormData({ ...formData, [field + "_lower"]: lower, [field + "_upper"]: upper });
  };

  const onSubmit = async () => {
    setApiProgress({ ...apiProgress, progress: API_PROGRESS.REQ });
    try {
      // NOTE: Using fake submission number for now
      const res = await axios.post("http://localhost:8000/api/form/status/update", formData);
      if (!res.data || !res.data.data || res.data.error) {
        setApiProgress({ error: res.data.error, msg: res.data.msg, progress: API_PROGRESS.FAILED });
      } else {
        setApiProgress({
          error: 0,
          msg: "Update form status successfully",
          progress: API_PROGRESS.SUCCESS
        });
      }
    } catch (error) {
      setApiProgress({
        ...apiProgress,
        progress: API_PROGRESS.FAILED,
        msg: "Server error, please try again!"
      });
    }
  };

  return (
    <>
      <EditSampleDialog
        open={
          apiProgress.progress == API_PROGRESS.FAILED ||
          apiProgress.progress == API_PROGRESS.SUCCESS
        }
        message={apiProgress.msg}
        title="Form Status"
        onClose={() => setApiProgress({ error: 0, msg: "", progress: API_PROGRESS.INIT })}
      />
      <Modal open={isOpen} onClose={onClose} sx={{ zIndex: 80 }}>
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
          <Grid container>
            <Grid container>
              <Grid item flex={1}>
                <Typography
                  id="modal-modal-title"
                  variant="h5"
                  component="h2"
                  fontWeight={"bold"}
                  marginBottom={"30px"}
                  color={theme.primary.dark}>
                  Submission Form #{submissionNum}
                </Typography>
              </Grid>
              <Grid item>
                <CloseIcon sx={{ cursor: "pointer" }} onClick={onClose} />
              </Grid>
            </Grid>
            <FormControl>
              <Grid item xs={6}>
                <SampleInput
                  label={"Status"}
                  name="status"
                  type="select"
                  options={SAMPLE_STATUS}
                  value={formData.status || "outstanding"}
                  onChange={(e) => onChangeInput("status", e.target.value)}
                />
              </Grid>
              <Grid container display="row">
                <Grid item xs={6} zIndex={1}>
                  <SampleInput
                    label={"Cut Date"}
                    name="cut_date"
                    type="date"
                    value={formData.cut_date || ""}
                    onChange={(value) => onChangeInput("cut_date", value)}
                  />
                </Grid>
                <Grid item xs={6} zIndex={1}>
                  <SampleInput
                    label={"Scale Verification"}
                    name="scale_verification"
                    type="doubleInput"
                    disableText={!formData.cut_date}
                    value={[
                      formData.scale_verification_lower || "",
                      formData.scale_verification_upper || ""
                    ]}
                    onChange={(e) => onChangeDoulbeInput("scale_verification", e.target)}
                    onBlur={() => updateDecimalNumbers("scale_verification", 3)}
                    error={!!errors.scale_verification}
                    helperText={errors.scale_verification || ""}
                  />
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <SampleInput
                  label={"Extraction Date"}
                  name="extraction_date"
                  type="date"
                  value={formData.extraction_date || ""}
                  onChange={(value) => onChangeInput("extraction_date", value)}
                />
              </Grid>
              <Grid item xs={6}>
                <SampleInput
                  label={"ReCut Date"}
                  name="recut_date"
                  type="date"
                  value={formData.recut_date || ""}
                  onChange={(value) => onChangeInput("recut_date", value)}
                />
              </Grid>
              <Grid container display="row">
                <Grid item xs={6}>
                  <SampleInput
                    label={"ReExtraction Date"}
                    name="reextracted_date"
                    type="date"
                    value={formData.reextracted_date || ""}
                    onChange={(value) => onChangeInput("reextracted_date", value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <SampleInput
                    label={"ReExtraction Reason"}
                    name="reason_for_reextraction"
                    type="text"
                    value={formData.reason_for_reextraction || ""}
                    onChange={(e) => onChangeInput("reason_for_reextraction", e.target.value)}
                    disableText={!formData.reextracted_date}
                  />
                </Grid>
              </Grid>
              <Grid container display="row">
                <Grid item xs={6}>
                  <SampleInput
                    label={"QPCR Complete Date"}
                    name="qcpr_complete_date"
                    type="date"
                    value={formData.qcpr_complete_date || ""}
                    onChange={(value) => onChangeInput("qcpr_complete_date", value)}
                  />
                </Grid>
                <Grid item xs={6} zIndex={1}>
                  <SampleInput
                    label={"Positive Control Ct"}
                    name="positive_control_ct"
                    type="doubleInput"
                    disableText={!formData.qcpr_complete_date}
                    value={[
                      formData.positive_control_ct_lower || "",
                      formData.positive_control_ct_upper || ""
                    ]}
                    onChange={(e) => onChangeDoulbeInput("positive_control_ct", e.target)}
                    onBlur={() => updateDecimalNumbers("positive_control_ct", 1)}
                    error={!!errors.positive_control_ct}
                    helperText={errors.positive_control_ct || ""}
                  />
                </Grid>
              </Grid>
              <Grid container display="row">
                <Grid item xs={6}></Grid>
                <Grid item xs={6} zIndex={1}>
                  <SampleInput
                    label={"Negative Control Ct"}
                    name="negative_control_ct"
                    type="doubleInput"
                    disableText={!formData.qcpr_complete_date}
                    value={[
                      formData.negative_control_ct_lower || "",
                      formData.negative_control_ct_upper || ""
                    ]}
                    onChange={(e) => onChangeDoulbeInput("negative_control_ct", e.target)}
                  />
                </Grid>
              </Grid>
              <Grid container display="row">
                <Grid item xs={6}></Grid>
                <Grid item xs={6} zIndex={1}>
                  <SampleInput
                    label=""
                    name="submit"
                    type="submit"
                    submitText="Save"
                    onClick={onSubmit}
                    loading={apiProgress.progress === API_PROGRESS.REQ}
                  />
                </Grid>
              </Grid>
            </FormControl>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default EditSample;
