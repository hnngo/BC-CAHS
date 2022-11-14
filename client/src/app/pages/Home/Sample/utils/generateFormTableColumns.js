import React from "react";

import { Chip, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const generateDateSchema = ({ field, headerName, width }) => ({
  field,
  headerName,
  width,
  valueFormatter: (params) => {
    if (!params.value) return params.value;

    let date = new Date(params.value);
    return date.toLocaleDateString();
  },
  valueGetter: (params) => {
    if (!params.value) return params.value;

    return new Date(params.value);
  }
});

const generateCapitalizedSchema = ({ field, headerName, width }) => ({
  field,
  headerName,
  width,
  valueGetter: (params) => {
    if (!params.value) return params.value;

    const res = [];
    params.value.split(" ").forEach((val) => {
      res.push(val.trim().charAt(0).toUpperCase() + val.trim().slice(1));
    });
    return res.join(" ");
  }
});

const generateColSchema = ({ theme, setSelectedFormData, handleOpen, onClickEdit }) => [
  {
    field: "action",
    headerName: "Action",
    width: 220,
    renderCell: (params) => {
      return (
        <Stack direction="row" flexWrap={"wrap"}>
          <Chip
            icon={<EditIcon sx={{ fill: theme.primary.white, fontSize: "16px" }} />}
            label={"Edit"}
            sx={{
              backgroundColor: theme.primary.dark,
              color: "#fff",
              padding: 1,
              cursor: "pointer"
            }}
            variant="filled"
            onClick={() => {
              onClickEdit(params.row);
            }}
          />
          <Chip
            icon={<EditIcon sx={{ fill: theme.primary.white, fontSize: "16px" }} />}
            label={"Status"}
            sx={{
              backgroundColor: theme.primary.contrast,
              color: "#fff",
              padding: 1,
              cursor: "pointer",
              marginLeft: "10px"
            }}
            variant="filled"
            onClick={() => {
              setSelectedFormData(params);
              handleOpen();
            }}
          />
        </Stack>
      );
    }
  },
  { field: "submission_num", headerName: "Submission #", width: 120 },
  generateCapitalizedSchema({ field: "status", headerName: "Status", width: 100 }),
  generateDateSchema({ field: "receive_date", headerName: "Date Received", width: 140 }),
  {
    field: "submit_time",
    headerName: "Time Received",
    width: 120,
    valueGetter: (params) => {
      return new Date(params.value).toLocaleTimeString();
    }
  },
  { field: "bc_cahs_receiver_name", headerName: "Receiver Name", width: 150 },
  { field: "company_name", headerName: "Company", width: 100 },
  { field: "submitter", headerName: "Submitter" },
  { field: "contact_phone_num", headerName: "Contact Phone #", width: 130 },
  { field: "client_case_num", headerName: "Client Case #", width: 110 },
  generateDateSchema({ field: "sampling_date", headerName: "Sampling Date", width: 120 }),
  { field: "sampling_location", headerName: "Sampling Location", width: 140 },
  { field: "bc_cahs_custodian_initials", headerName: "BC CAHS Custodian", width: 160 },
  { field: "bc_cahs_pi", headerName: "BC CAHS P.I.", width: 120 },
  { field: "bc_cahs_project", headerName: "BC CAHS Projcet", width: 150 },
  { field: "num_of_samples", headerName: "# of Sample", width: 120 },
  { field: "species", headerName: "Sample Species", width: 150 },
  { field: "sample_type", headerName: "Sample Type", width: 120 },
  { field: "sample_origin", headerName: "Sample Origin", width: 130 },
  { field: "sample_condition", headerName: "Sample Condition", width: 150 },
  { field: "sample_details", headerName: "Sample Details", width: 130 },
  {
    field: "analysis_requested",
    headerName: "Analysis Requested",
    width: 150,
    valueGetter: (params) => {
      return (params.value || "").toUpperCase();
    }
  },
  {
    field: "rt_qpcr_type",
    headerName: "RT-qPCR Targets",
    width: 180,
    renderCell: (params) => {
      return (
        <Stack direction="row" flexWrap={"wrap"}>
          {(params.value || "").split(",").map((v, idx) => (
            <Chip
              key={v + idx}
              label={v}
              sx={{ backgroundColor: theme.primary.dark, color: "#fff", margin: 0.5 }}
              variant="filled"
            />
          ))}
        </Stack>
      );
    }
  },
  generateDateSchema({ field: "cut_date", headerName: "Cut Date", width: 100 }),
  generateCapitalizedSchema({
    field: "cut_date_initials",
    headerName: "Cut Date signed off by",
    width: 150
  }),
  { field: "scale_verification_lower", headerName: "Scale Verification Lower", width: 150 },
  { field: "scale_verification_upper", headerName: "Scale Verification Upper", width: 150 },
  generateDateSchema({ field: "extraction_date", headerName: "Extraction Date", width: 130 }),
  generateCapitalizedSchema({
    field: "extraction_date_initials",
    headerName: "Extraction Date signed off by",
    width: 150
  }),
  generateDateSchema({ field: "recut_date", headerName: "ReCut Date", width: 130 }),
  generateCapitalizedSchema({
    field: "recut_date_initials",
    headerName: "ReCut Date signed off by",
    width: 150
  }),
  generateDateSchema({ field: "reextracted_date", headerName: "ReExtraction Date", width: 130 }),
  generateCapitalizedSchema({
    field: "reextracted_date_initials",
    headerName: "ReExtraction Date signed off by",
    width: 150
  }),
  { field: "reason_for_reextraction", headerName: "ReExtraction Reason", width: 150 },
  generateDateSchema({ field: "qcpr_complete_date", headerName: "QCPR Complete Date", width: 130 }),
  generateCapitalizedSchema({
    field: "qcpr_complete_date_initials",
    headerName: "QCPR Complete Date signed off by",
    width: 150
  }),
  { field: "positive_control_ct_lower", headerName: "Positive Control Ct Lower", width: 150 },
  { field: "positive_control_ct_upper", headerName: "Positive Control Ct Upper", width: 150 },
  { field: "negative_control_ct_lower", headerName: "Negativ Control Ct Lower", width: 150 },
  { field: "negative_control_ct_upper", headerName: "Negativ Control Ct Upper", width: 150 }
];

export default generateColSchema;
