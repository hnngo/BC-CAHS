import React from "react";

// Components
import { DataGrid } from "@mui/x-data-grid";
import { Chip, Stack } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

// Utils
import { getMockFormData } from "../../../../mocks/mock-sample";

const ManageSample = () => {
  const theme = useTheme();
  const [columns, setColumns] = React.useState([]);

  // Using Mockdata for now
  const data = getMockFormData(100);

  React.useEffect(() => {
    const col = [
      { field: "id", headerName: "Submission #", width: 120 },
      { field: "receipt_date", headerName: "Date Received", width: 140 },
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
    <DataGrid
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
          color: theme.primary.white
        },
        "& .sample-form-table-row": {
          backgroundColor: theme.primary.standard
        },
        "&:hover": {
          cursor: "pointer"
        }
      }}
      rows={data}
      columns={columns}
      pageSize={20}
      rowsPerPageOptions={[20]}
      getRowHeight={() => "auto"}
      getRowClassName={() => "sample-form-table-row"}
      Co
    />
  );
};

export default ManageSample;
