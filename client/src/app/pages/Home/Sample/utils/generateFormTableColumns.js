import React from "react";

import { Tooltip, Chip, Grid, Stack } from "@mui/material";
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

const generateColSchema = ({ theme, setSelectedFormData, handleOpen }) => [
  {
    field: "action",
    headerName: "Action",
    width: 120,
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
  {
    field: "cut_date",
    headerName: "Cut Date",
    width: 150,
    renderCell: (params) => {
      if (!params.value) return params.value;

      return (
        <Grid container display="column" height={"100%"} marginY={1}>
          <Grid item>{new Date(params.value).toLocaleDateString()}</Grid>
          <Grid item>
            <Stack direction="row" flexWrap={"wrap"}>
              <Tooltip title="Scale Verification">
                <Chip
                  label={
                    (params.row.scale_verification_lower || "N/A") +
                    " - " +
                    (params.row.scale_verification_upper || "N/A")
                  }
                  sx={{
                    backgroundColor: theme.primary.dark,
                    color: "#fff"
                  }}
                  variant="filled"
                />
              </Tooltip>
            </Stack>
          </Grid>
          <Grid item>Signed off by: {params.row.cut_date_initials || "N/A"}</Grid>
        </Grid>
      );
    },
    valueFormatter: (params) => {
      if (!params.value) return params.value;

      let date = new Date(params.value);
      return date.toLocaleDateString();
    },
    valueGetter: (params) => {
      if (!params.value) return params.value;

      return new Date(params.value);
    }
  },
  {
    field: "extraction_date",
    headerName: "Extraction Date",
    width: 150,
    renderCell: (params) => {
      if (!params.value) return params.value;

      return (
        <Grid container display="column" height={"100%"} marginY={1}>
          <Grid item>{new Date(params.value).toLocaleDateString()}</Grid>
          <Grid item>Signed off by: {params.row.extraction_date_initials || "N/A"}</Grid>
        </Grid>
      );
    },
    valueFormatter: (params) => {
      if (!params.value) return params.value;

      let date = new Date(params.value);
      return date.toLocaleDateString();
    },
    valueGetter: (params) => {
      if (!params.value) return params.value;

      return new Date(params.value);
    }
  },
  {
    field: "recut_date",
    headerName: "ReCut Date",
    width: 150,
    renderCell: (params) => {
      if (!params.value) return params.value;

      return (
        <Grid container display="column" height={"100%"} marginY={1}>
          <Grid item>{new Date(params.value).toLocaleDateString()}</Grid>
          <Grid item>Signed off by: {params.row.recut_date_initials || "N/A"}</Grid>
        </Grid>
      );
    },
    valueFormatter: (params) => {
      if (!params.value) return params.value;

      let date = new Date(params.value);
      return date.toLocaleDateString();
    },
    valueGetter: (params) => {
      if (!params.value) return params.value;

      return new Date(params.value);
    }
  },
  {
    field: "reextracted_date",
    headerName: "ReExtraction Date",
    width: 150,
    renderCell: (params) => {
      if (!params.value) return params.value;

      return (
        <Grid container display="column" height={"100%"} marginY={1}>
          <Grid item>{new Date(params.value).toLocaleDateString()}</Grid>
          <Grid item>Signed off by: {params.row.reextracted_date_initials || "N/A"}</Grid>
          <Grid item>Reason: {params.row.reason_for_reextraction || "N/A"}</Grid>
        </Grid>
      );
    },
    valueFormatter: (params) => {
      if (!params.value) return params.value;

      let date = new Date(params.value);
      return date.toLocaleDateString();
    },
    valueGetter: (params) => {
      if (!params.value) return params.value;

      return new Date(params.value);
    }
  },
  {
    field: "qcpr_complete_date",
    headerName: "QCPR Complete Date",
    width: 150,
    renderCell: (params) => {
      if (!params.value) return params.value;

      return (
        <Grid container display="column" height={"100%"} marginY={1}>
          <Grid item>{new Date(params.value).toLocaleDateString()}</Grid>
          <Grid item>
            <Stack direction="row" flexWrap={"wrap"}>
              <Tooltip title="Positive Control Ct">
                <Chip
                  label={
                    (params.row.positive_control_ct_lower || "N/A") +
                    " - " +
                    (params.row.positive_control_ct_upper || "N/A")
                  }
                  sx={{
                    backgroundColor: theme.primary.dark,
                    color: "#fff"
                  }}
                  variant="filled"
                />
              </Tooltip>
            </Stack>
          </Grid>
          <Grid item>
            <Stack direction="row" flexWrap={"wrap"}>
              <Tooltip title="Negative Control Ct">
                <Chip
                  label={
                    (params.row.negative_control_ct_lower || "N/A") +
                    " - " +
                    (params.row.negative_control_ct_upper || "N/A")
                  }
                  sx={{
                    backgroundColor: theme.primary.dark,
                    color: "#fff"
                  }}
                  variant="filled"
                />
              </Tooltip>
            </Stack>
          </Grid>
          <Grid item>Signed off by: {params.row.reextracted_date_initials || "N/A"}</Grid>
        </Grid>
      );
    },
    valueFormatter: (params) => {
      if (!params.value) return params.value;

      let date = new Date(params.value);
      return date.toLocaleDateString();
    },
    valueGetter: (params) => {
      if (!params.value) return params.value;

      return new Date(params.value);
    }
  }
];

export default generateColSchema;
