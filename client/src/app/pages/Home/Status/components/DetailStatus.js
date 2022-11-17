import React from "react";

// Components
import { Grid, Typography, Stack, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { styled, useTheme } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import EditSample from "../../Sample/components/EditSample";
import EditIcon from "@mui/icons-material/Edit";

// Constants
import { ANALYSIS_REQUESTS } from "../../constants";

const DetailStatus = ({ selectedAnalysis, data, onUpdateForm }) => {
  const theme = useTheme();
  const [formData, setFormData] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [openFormDetail, setOpenFormDetail] = React.useState(false);
  const [selectedFormData, setSelectedFormData] = React.useState(null);
  const handleOpen = () => setOpenFormDetail(true);
  const handleClose = () => setOpenFormDetail(false);

  React.useEffect(() => {
    setFormData(data);
  }, [data]);

  React.useEffect(() => {
    const columns = [
      {
        field: "action",
        headerName: "Action",
        width: 120,
        suppressSizeToFit: true,
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
      { field: "submission_num", headerName: "Submission #", width: 120, suppressSizeToFit: true },
      { field: "num_of_samples", headerName: "# of Sample", width: 120, suppressSizeToFit: true },
      { field: "sampling_date", headerName: "Submitted", width: 150, suppressSizeToFit: true },
      {
        field: "status",
        headerName: "Status",
        width: 150,
        suppressSizeToFit: true,
        valueGetter: (params) => {
          if (!params.value) return params.value;

          const res = [];
          params.value.split(" ").forEach((val) => {
            res.push(val.trim().charAt(0).toUpperCase() + val.trim().slice(1));
          });
          return res.join(" ");
        }
      }
    ];
    columns.forEach((c) => {
      c.headerClassName = "detail-staus-header";
    });
    setColumns(columns);
  }, []);

  const onUpdateSelectedForm = (newFormDate) => {
    const selectedNum = selectedFormData.row.submission_num;
    setFormData(
      formData.map((d) => {
        if (d.submission_num == selectedNum) {
          return { ...d, ...newFormDate };
        } else {
          return d;
        }
      })
    );
    onUpdateForm();
  };

  return (
    <Grid
      height="100%"
      container
      flexDirection="column"
      alignItems="center"
      justifyContent="center">
      <Grid item>
        <Typography variant="h4" fontWeight={"bold"}>
          {ANALYSIS_REQUESTS[selectedAnalysis]}
        </Typography>
      </Grid>
      <Grid item flex={1} width="100%">
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
            "& .MuiDataGrid-columnHeaders ": {
              backgroundColor: theme.primary.dark,
              color: theme.primary.white,
              fontWeight: "800"
            },
            "& .detail-staus-header": {
              backgroundColor: theme.primary.dark,
              color: theme.primary.white,
              fontWeight: "800"
            },
            "& .detail-status-table-row": {
              backgroundColor: theme.primary.standard
            },
            "&:hover": {
              cursor: "pointer"
            }
          }}
          rows={formData}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20]}
          getRowClassName={() => "detail-status-table-row"}
          getRowId={(e) => e.submission_num}
        />
        {openFormDetail && (
          <EditSample
            onClose={handleClose}
            submissionNum={
              selectedFormData && selectedFormData.row && selectedFormData.row.submission_num
            }
            onUpdateSelectedForm={onUpdateSelectedForm}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default DetailStatus;
