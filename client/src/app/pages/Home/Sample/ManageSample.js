import React from "react";

// Components
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport
} from "@mui/x-data-grid";
import EditSample from "./components/EditSample";
import { Grid } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

// Utils
import axios from "axios";
import generateFormTableColumns from "./utils/generateFormTableColumns";
import { API_PROGRESS } from "../../../utils/constants";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

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
    const col = generateFormTableColumns({ theme, handleOpen, setSelectedFormData });
    col.forEach((c) => {
      c.headerClassName = "sample-form-table-header";
    });
    setColumns(col);
  }, []);

  const onUpdateSelectedForm = (newFormDate) => {
    const selectedNum = selectedFormData.row.submission_num;
    setData(
      data.map((d) => {
        if (d.submission_num == selectedNum) {
          return { ...d, ...newFormDate };
        } else {
          return d;
        }
      })
    );
  };

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
          }),
          Toolbar: CustomToolbar
        }}
        sx={{
          "& .sample-form-table-header": {
            backgroundColor: theme.primary.dark,
            color: theme.primary.white,
            fontWeight: "800"
          },
          "& .MuiDataGrid-toolbarContainer": {
            backgroundColor: theme.primary.dark,
            fontWeight: "800",
            "& button": {
              color: theme.primary.white
            }
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
  );
};

export default ManageSample;
