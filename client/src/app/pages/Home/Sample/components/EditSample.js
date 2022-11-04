import React from "react";

// Components
import SampleInput from "../../components/SampleInput";
import { Modal, Box, Typography, FormControl, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Constants
import { SAMPLE_STATUS } from "../../constants";

// Utils
import { validate, VALIDATE_TYPES } from "../../../../utils/validator";

const EditSample = ({ isOpen, onClose, data }) => {
  const theme = useTheme();

  // NOTE: Get the real status here
  const [inputs, setInputs] = React.useState({});
  const [errors, setErrors] = React.useState({});

  // Return nothing if no data provided
  if (!data) {
    return;
  }

  const onChangeInput = (field, value) => {
    setInputs({ ...inputs, [field]: value });
  };

  const onChangeDoulbeInput = (field, target) => {
    const validateErrors = validate(target.value, [VALIDATE_TYPES.NUMBER_ONLY]);
    if (validateErrors.length) {
      setErrors({ ...errors, [field]: validateErrors[0] });
    } else {
      setErrors({ ...errors, [field]: null });
    }

    if (!inputs[field]) {
      inputs[field] = [];
    }

    if (target.name.endsWith("_lower")) {
      inputs[field][0] = target.value;
    } else {
      inputs[field][1] = target.value;
    }
    onChangeInput(field, inputs[field]);
  };

  const updateDecimalNumbers = (field, decimalPoints = 0) => {
    if (errors[field]) {
      return;
    }
    if (inputs[field]) {
      let lower = "";
      let upper = "";
      if (inputs[field][0]) {
        lower = (+inputs[field][0]).toFixed(decimalPoints);
      }
      if (inputs[field][1]) {
        upper = (+inputs[field][1]).toFixed(decimalPoints);
      }
      onChangeInput(field, [lower.toString(), upper.toString()]);
    }
  };

  const onSubmit = () => {
    console.log(inputs);
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
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
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            fontWeight={"bold"}
            marginBottom={"30px"}
            color={theme.primary.dark}>
            Submission Form #{data.submission_num}
          </Typography>
          <FormControl>
            <Grid item xs={6}>
              <SampleInput
                label={"Status"}
                name="sampleStatus"
                type="select"
                options={SAMPLE_STATUS}
                value={inputs.sampleStatus || "outstanding"}
                onChange={(e) => onChangeInput("sampleStatus", e.target.value)}
              />
            </Grid>
            <Grid container display="row">
              <Grid item xs={6} zIndex={1}>
                <SampleInput
                  label={"Cut Date"}
                  name="cutDate"
                  type="date"
                  value={inputs.cutDate || ""}
                  onChange={(e) => onChangeInput("cutDate", e.$d)}
                />
              </Grid>
              <Grid item xs={6} zIndex={1}>
                <SampleInput
                  label={"Scale Verification"}
                  name="scaleVerification"
                  type="doubleInput"
                  disableText={!inputs.cutDate}
                  value={inputs.scaleVerification || []}
                  onChange={(e) => onChangeDoulbeInput("scaleVerification", e.target)}
                  onBlur={() => updateDecimalNumbers("scaleVerification", 3)}
                  error={!!errors.scaleVerification}
                  helperText={errors.scaleVerification || ""}
                />
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <SampleInput
                label={"Extraction Date"}
                name="extractionDate"
                type="date"
                value={inputs.extractionDate || ""}
                onChange={(value) => onChangeInput("extractionDate", value)}
              />
            </Grid>
            <Grid item xs={6}>
              <SampleInput
                label={"ReCut Date"}
                name="reCutDate"
                type="date"
                value={inputs.reCutDate || ""}
                onChange={(value) => onChangeInput("reCutDate", value)}
              />
            </Grid>
            <Grid item xs={6}>
              <SampleInput
                label={"ReExtraction Date"}
                name="reExtractionDate"
                type="date"
                value={inputs.reExtractionDate || ""}
                onChange={(value) => onChangeInput("reExtractionDate", value)}
              />
            </Grid>
            <Grid container display="row">
              <Grid item xs={6}>
                <SampleInput
                  label={"QPCR Complete Date"}
                  name="qpcrCompleteDate"
                  type="date"
                  value={inputs.qpcrCompleteDate || ""}
                  onChange={(value) => onChangeInput("qpcrCompleteDate", value)}
                />
              </Grid>
              <Grid item xs={6} zIndex={1}>
                <SampleInput
                  label={"Positive Control Ct"}
                  name="positiveControlCT"
                  type="doubleInput"
                  disableText={!inputs.qpcrCompleteDate}
                  value={inputs.positiveControlCT || []}
                  onChange={(e) => onChangeDoulbeInput("positiveControlCT", e.target)}
                  onBlur={() => updateDecimalNumbers("positiveControlCT", 1)}
                  error={!!errors.positiveControlCT}
                  helperText={errors.positiveControlCT || ""}
                />
              </Grid>
            </Grid>
            <Grid container display="row">
              <Grid item xs={6}></Grid>
              <Grid item xs={6} zIndex={1}>
                <SampleInput
                  label={"Negative Control Ct"}
                  name="negativeControlCT"
                  type="doubleInput"
                  disableText={!inputs.qpcrCompleteDate}
                  value={inputs.negativeControlCT || []}
                  onChange={(e) => onChangeDoulbeInput("negativeControlCT", e.target)}
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
                />
              </Grid>
            </Grid>
          </FormControl>
        </Grid>
      </Box>
    </Modal>
  );
};

export default EditSample;
