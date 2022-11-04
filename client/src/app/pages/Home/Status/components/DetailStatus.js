import React from "react";

// Components
import { Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "submission_num", headerName: "Submission #", width: 150 },
  { field: "num_of_samples", headerName: "# of Sample", width: 150 },
  { field: "sampling_date", headerName: "Submitted", width: 150 }
];

const DetailStatus = ({ data }) => {
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
        <DataGrid rows={data} columns={columns} pageSize={20} rowsPerPageOptions={[20]} />
      </Grid>
    </Grid>
  );
};

export default DetailStatus;
