import React from "react";

// Components
import { DataGrid, gridDateFormatter } from "@mui/x-data-grid";
import { Chip, Grid, Stack, Modal, Box, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import EditIcon from "@mui/icons-material/Edit";

// Utils
import { getMockFormData } from "../../../../mocks/mock-sample";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

const ManageSample = () => {
  const theme = useTheme();
  const [data, setData] = React.useState(null);
  const [columns, setColumns] = React.useState([]);
  const [openFormDetail, setOpenFormDetail] = React.useState(false);

  const handleOpen = () => setOpenFormDetail(true);
  const handleClose = () => setOpenFormDetail(false);

  React.useEffect(() => {
    setData(getMockFormData(100));
  }, []);

  React.useEffect(() => {
    const col = [
      {
        field: "action",
        headerName: "Action",
        width: 120,
        renderCell: () => {
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
                  handleOpen();
                }}
              />
            </Stack>
          );
        }
      },
      { field: "id", headerName: "Submission #", width: 120 },
      {
        field: "receipt_date",
        headerName: "Date Received",
        width: 140,
        valueFormatter: (params) => {
          return new Date(params.value).toLocaleDateString();
        },
        valueGetter: (params) => {
          return new Date(params.value);
        }
      },
      { field: "sampling_time_submission", headerName: "Time Received", width: 120 },
      { field: "bc_cahs_receiver_first_name", headerName: "Receiver First Name", width: 150 },
      { field: "bc_cahs_receiver_last_name", headerName: "Receiver Last Name", width: 150 },
      { field: "company_name", headerName: "Company", width: 100 },
      { field: "submitter", headerName: "Submitter" },
      { field: "contact_phone_num", headerName: "Contact Phone #", width: 130 },
      { field: "client_case_num", headerName: "Client Case #", width: 110 },
      { field: "sampling_date", headerName: "Sampling Date", width: 120 },
      { field: "sampling_location", headerName: "Sampling Location", width: 140 },
      { field: "bc_cahs_custodian_initials", headerName: "BC CAHS Custodian", width: 160 },
      { field: "bc_cahs_p_i", headerName: "BC CAHS P.I.", width: 120 },
      { field: "bc_cahs_project", headerName: "BC CAHS Projcet", width: 150 },
      { field: "num_of_samples", headerName: "# of Sample", width: 120 },
      { field: "species", headerName: "Sample Species", width: 150 },
      { field: "sample_type", headerName: "Sample Type", width: 120 },
      { field: "sample_origin", headerName: "Sample Origin", width: 130 },
      { field: "sample_condition", headerName: "Sample Condition", width: 150 },
      { field: "other_details", headerName: "Sample Details", width: 140 },

      { field: "analysis_requested", headerName: "Analysis Requested", width: 140 },
      {
        field: "rt_qpcr_type",
        headerName: "RT-qPCR Targets",
        width: 200,
        renderCell: (params) => {
          return (
            <Stack direction="row" flexWrap={"wrap"}>
              {(params.value || []).map((v) => (
                <Chip
                  key={v}
                  label={v}
                  sx={{ backgroundColor: theme.primary.dark, color: "#fff", margin: 0.5 }}
                  variant="filled"
                />
              ))}
            </Stack>
          );
        }
      }
    ];
    col.forEach((c) => {
      c.headerClassName = "sample-form-table-header";
    });
    setColumns(col);
  }, []);

  return (
    <Grid height={"100%"}>
      <DataGrid
        loading={!data}
        components={{
          ColumnMenuIcon: styled(MoreVertIcon)({
            fill: theme.primary.white
          }),
          ColumnSortedAscendingIcon: styled(ArrowUpwardIcon)({
            fill: theme.primary.white
          }),
          ColumnSortedDescendingIcon: styled(ArrowDownwardIcon)({
            fill: theme.primary.white
          }),
          ColumnFilteredIcon: styled(FilterAltIcon)({
            fill: theme.primary.white
          })
        }}
        sx={{
          "& .sample-form-table-header": {
            backgroundColor: theme.primary.dark,
            color: theme.primary.white,
            fontWeight: "800"
          },
          "& .sample-form-table-row": {
            backgroundColor: theme.primary.standard
          },
          "&:hover": {
            cursor: "pointer"
          }
        }}
        rows={data || []}
        columns={columns}
        pageSize={20}
        isRowSelectable={() => false}
        rowsPerPageOptions={[20]}
        getRowHeight={() => "auto"}
        getRowClassName={() => "sample-form-table-row"}
      />
      <Modal open={openFormDetail} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Form Detail
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </Grid>
  );
};

export default ManageSample;
