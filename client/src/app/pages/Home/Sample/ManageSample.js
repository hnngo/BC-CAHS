import React from "react";

// Components
import { DataGrid } from "@mui/x-data-grid";
import EditSample from "./components/EditSample";
import { Chip, Grid, Stack } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import EditIcon from "@mui/icons-material/Edit";

// Utils
import { API_PROGRESS } from "../../../utils/constants";
import axios from "axios";

const ManageSample = () => {
  const theme = useTheme();
  const [data, setData] = React.useState([]);
  const [pagination, setPagination] = React.useState({
    limit: 20,
    offset: 0,
    total: 20
  });
  const [columns, setColumns] = React.useState([]);
  const [openFormDetail, setOpenFormDetail] = React.useState(false);
  const [selectedFormData, setSelectedFormData] = React.useState(null);
  const [apiProgress, setApiProgress] = React.useState({
    progress: API_PROGRESS.INIT
  });

  const handleOpen = () => setOpenFormDetail(true);
  const handleClose = () => setOpenFormDetail(false);

  const fetchForm = async () => {
    // If the offset is less than data length (go previous page) then just ignore
    if (data.length > pagination.offset) {
      return;
    }

    setApiProgress({ apiProgress: API_PROGRESS.REQ });
    const res = await axios.get(
      `http://localhost:8000/api/form?offset=${pagination.offset}&limit=${pagination.limit}`,
      {
        withCredentials: true
      }
    );

    setApiProgress({ apiProgress: API_PROGRESS.SUCCESS });
    if (res.data && res.data.data && res.data.data.forms) {
      const newData = [...data];
      newData.splice(pagination.offset, 0, ...res.data.data.forms);
      setData(newData);
      setPagination({ ...pagination, total: +res.data.data.total });
    }
  };

  React.useEffect(() => {
    fetchForm();
  }, []);

  React.useEffect(() => {
    fetchForm();
  }, [pagination.offset]);

  React.useEffect(() => {
    const col = [
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
      {
        field: "status",
        headerName: "Status",
        width: 100,
        valueFormatter: (params) => {
          return params.value.charAt(0).toUpperCase() + params.value.slice(1);
        }
      },
      {
        field: "receive_date",
        headerName: "Date Received",
        width: 140,
        valueFormatter: (params) => {
          return new Date(params.value).toLocaleDateString();
        },
        valueGetter: (params) => {
          return new Date(params.value);
        }
      },
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
      { field: "sampling_date", headerName: "Sampling Date", width: 120 },
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
        width: 200,
        renderCell: (params) => {
          return (
            <Stack direction="row" flexWrap={"wrap"}>
              {(params.value || "").split(",").map((v) => (
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
        loading={!data || apiProgress.progress === API_PROGRESS.REQ}
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
        getRowId={(e) => e.submission_num}
        rowCount={pagination.total}
        onPageChange={(e) => {
          setPagination({ ...pagination, offset: e * pagination.limit });
        }}
      />
      <EditSample
        isOpen={openFormDetail}
        onClose={handleClose}
        submissionNum={
          selectedFormData && selectedFormData.row && selectedFormData.row.submission_num
        }
      />
    </Grid>
  );
};

export default ManageSample;
