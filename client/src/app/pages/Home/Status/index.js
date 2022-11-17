import React from "react";

// API
import { apiGetForms, apiGetStatusSummary } from "../../../api/form";

// Components
import { Grid } from "@mui/material";
import StatusChart from "./components/StatusChart";
import DetailStatus from "./components/DetailStatus";

// Utils and constants
import { ANALYSIS_REQUESTS } from "../constants";

const Status = () => {
  const [formData, setFormData] = React.useState([]);
  const [selectedAnalysis, setSelectedAnalysis] = React.useState("atpase");
  const [statusData, setStatusData] = React.useState([]);
  const [pagination, setPagination] = React.useState({
    limit: 20,
    offset: 0,
    total: 20
  });

  const fetchForm = async () => {
    // If the offset is less than data length (go previous page) then just ignore
    if (formData.length > pagination.offset) {
      return;
    }

    const { error, data } = await apiGetForms(
      pagination.offset,
      pagination.limit,
      selectedAnalysis
    );

    if (!error && data && data.forms) {
      const newData = [...formData];
      newData.splice(pagination.offset, 0, ...data.forms);
      setFormData(newData);
      setPagination({ ...pagination, total: +data.total });
    }
  };

  React.useEffect(() => {
    fetchForm();
  }, [selectedAnalysis]);

  const fetchStatusSummary = async () => {
    const { data, error, msg } = await apiGetStatusSummary();

    if (!error && data) {
      const formatStatusData = {};

      (data || []).forEach((s) => {
        if (formatStatusData[s.analysis_requested]) {
          formatStatusData[s.analysis_requested][s.status] = s.count;
        } else {
          formatStatusData[s.analysis_requested] = {
            name: ANALYSIS_REQUESTS[s.analysis_requested],
            key: s.analysis_requested,
            outstanding: 0,
            processing: 0,
            ready: 0
          };
          formatStatusData[s.analysis_requested][s.status] = s.count;
        }
      });

      Object.keys(ANALYSIS_REQUESTS).forEach((type) => {
        if (!formatStatusData[type]) {
          formatStatusData[type] = {
            name: ANALYSIS_REQUESTS[type],
            key: type,
            outstanding: 0,
            processing: 0,
            ready: 0
          };
        }
      });

      setStatusData(Object.values(formatStatusData));
    } else {
      //
    }
  };

  // Fetch chart summary
  React.useEffect(() => {
    fetchStatusSummary();
  }, []);

  if (!statusData) return null;

  return (
    <Grid width="100%" height="100%" container>
      <Grid item xs={7}>
        <StatusChart data={statusData} onClick={(label) => setSelectedAnalysis(label)} />
      </Grid>
      <Grid item xs={5}>
        <DetailStatus
          selectedAnalysis={selectedAnalysis}
          data={formData.filter((form) => form.analysis_requested === selectedAnalysis)}
        />
      </Grid>
    </Grid>
  );
};

export default Status;
