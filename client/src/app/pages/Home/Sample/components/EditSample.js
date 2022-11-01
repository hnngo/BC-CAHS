import React from "react";

// Components
import SampleInput from "../../components/SampleInput";
import { Modal, Box, Typography, FormControl, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Constants
import { SAMPLE_STATUS } from "../../constants";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

const EditSample = ({ isOpen, onClose, data }) => {
  const theme = useTheme();

  // NOTE: Get the real status here
  const [inputs, setInputs] = React.useState({});

  // Return nothing if no data provided
  if (!data) {
    return;
  }

  const onChangeDate = (field, value) => {
    setInputs({ ...inputs, [field]: value });
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
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
              />
            </Grid>
            <Grid container display="row">
              <Grid item xs={6} zIndex={1}>
                <SampleInput
                  label={"Cut Date"}
                  name="cutDate"
                  type="date"
                  value={inputs.cutDate || null}
                  onChange={(value) => onChangeDate("cutDate", value)}
                />
              </Grid>
              <Grid item xs={6} zIndex={1}>
                <SampleInput
                  label={"Scale Verification"}
                  name="scaleVerification"
                  type="doubleInput"
                  value={inputs.scaleVerification || []}
                  onChange={(value) => onChangeDate("scaleVerification", value)}
                />
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <SampleInput
                label={"Extraction Date"}
                name="extractionDate"
                type="date"
                value={inputs.extractionDate || null}
                onChange={(value) => onChangeDate("extractionDate", value)}
              />
            </Grid>
            <Grid item xs={6}>
              <SampleInput
                label={"ReCut Date"}
                name="reCutDate"
                type="date"
                value={inputs.reCutDate || null}
                onChange={(value) => onChangeDate("reCutDate", value)}
              />
            </Grid>
            <Grid item xs={6}>
              <SampleInput
                label={"ReExtraction Date"}
                name="reExtractionDate"
                type="date"
                value={inputs.reExtractionDate || null}
                onChange={(value) => onChangeDate("reExtractionDate", value)}
              />
            </Grid>
            <Grid container display="row">
              <Grid item xs={6}>
                <SampleInput
                  label={"QPCR Complete Date"}
                  name="qpcrCompleteDate"
                  type="date"
                  value={inputs.qpcrCompleteDate || null}
                  onChange={(value) => onChangeDate("qpcrCompleteDate", value)}
                />
              </Grid>
              <Grid item xs={6} zIndex={1}>
                <SampleInput
                  label={"Positive Control Ct"}
                  name="positiveControlCT"
                  type="doubleInput"
                  value={inputs.positiveControlCT || []}
                  onChange={(value) => onChangeDate("positiveControlCT", value)}
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
                  value={inputs.positiveControlCT || []}
                  onChange={(value) => onChangeDate("negativeControlCT", value)}
                />
              </Grid>
            </Grid>
            <Grid container display="row">
              <Grid item xs={6}></Grid>
              <Grid item xs={6} zIndex={1}>
                <SampleInput label="" name="submit" type="submit" submitText="Save" />
              </Grid>
            </Grid>
          </FormControl>
        </Grid>
      </Box>
    </Modal>
  );
};

export default EditSample;
