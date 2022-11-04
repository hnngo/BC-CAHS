import React from "react";

// Components
import { Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { styled, useTheme } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const columns = [
  { field: "submission_num", headerName: "Submission #", width: 150 , suppressSizeToFit: true},
  { field: "num_of_samples", headerName: "# of Sample", width: 150 , suppressSizeToFit: true},
  { field: "sampling_date", headerName: "Submitted", width: 400 , suppressSizeToFit: true}
];
columns.forEach((c) => {
  c.headerClassName = "sample-form-table-header";
});

const DetailStatus = ({ data }) => {
  const theme = useTheme();
  if (!data || !data.length) return null;
  return (
    <Grid
      height="100%"
      container
      flexDirection="column"
      alignItems="center"
      justifyContent="center">
      <Grid item>
        <Typography variant="h4" fontWeight={"bold"}>
          {data[0].analysis_requested}
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
        rows={data} columns={columns} pageSize={20} rowsPerPageOptions={[20]} 
        getRowClassName={() => "sample-form-table-row"}/>
      </Grid>
    </Grid>
  );
};

export default DetailStatus;
