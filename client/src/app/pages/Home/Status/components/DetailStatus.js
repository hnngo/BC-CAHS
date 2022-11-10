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


const DetailStatus = ({ data }) => {
  const theme = useTheme();

  const [columns, setColumns] = React.useState([]);
  const [openFormDetail, setOpenFormDetail] = React.useState(false);
  const [selectedFormData, setSelectedFormData] = React.useState(null);
  const handleOpen = () => setOpenFormDetail(true);
  const handleClose = () => setOpenFormDetail(false);

  React.useEffect(() =>  {
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
  
      { field: "submission_num", headerName: "Submission #", width: 120 ,  suppressSizeToFit: true},
      { field: "num_of_samples", headerName: "# of Sample", width: 120 , suppressSizeToFit: true},
      { field: "sampling_date", headerName: "Submitted", width: 150 , suppressSizeToFit: true},
      { field: "status", headerName: "Status", width: 150 , suppressSizeToFit: true}
    ];
    columns.forEach((c) => {
      c.headerClassName = "detail-staus-header";
    });
    setColumns(columns);
  }, [])
  
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
        rows={data} columns={columns} pageSize={20} rowsPerPageOptions={[20]} 
        getRowClassName={() => "detail-status-table-row"}/>
        <EditSample
        isOpen={openFormDetail}
        onClose={handleClose}
        data={selectedFormData && selectedFormData.row}
      />
      </Grid>
    </Grid>
  );
};

export default DetailStatus;
