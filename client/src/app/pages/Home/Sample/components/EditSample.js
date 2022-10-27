import React from "react";

// Components
import SampleInput from "../../components/SampleInput";
import { Modal, Box, Typography, FormControl } from "@mui/material";
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
          <SampleInput
            label={"Status"}
            name="sampleStatus"
            type="select"
            options={SAMPLE_STATUS}
            value={inputs.sampleStatus || "outstanding"}
          />
          <SampleInput
            label={"Cut Date"}
            name="cutDate"
            type="date"
            value={inputs.cutDate || null}
            onChange={(value) => onChangeDate("cutDate", value)}
          />
          <SampleInput
            label={"Extraction Date"}
            name="extractionDate"
            type="date"
            value={inputs.extractionDate || null}
            onChange={(value) => onChangeDate("extractionDate", value)}
          />
          <SampleInput
            label={"ReCut Date"}
            name="reCutDate"
            type="date"
            value={inputs.reCutDate || null}
            onChange={(value) => onChangeDate("reCutDate", value)}
          />
          <SampleInput
            label={"ReExtraction Date"}
            name="reExtractionDate"
            type="date"
            value={inputs.reExtractionDate || null}
            onChange={(value) => onChangeDate("reExtractionDate", value)}
          />
          <SampleInput
            label={"QPCR Complete Date"}
            name="qpcrCompleteDate"
            type="date"
            value={inputs.qpcrCompleteDate || null}
            onChange={(value) => onChangeDate("qpcrCompleteDate", value)}
          />
          <SampleInput
            label={"Signed off by"}
            name="signOffBy"
            type="text"
            value={"Shelby"}
            disableText
          />
          <SampleInput label="" name="submit" type="submit" submitText="Save" />
        </FormControl>
      </Box>
    </Modal>
  );
};

export default EditSample;
