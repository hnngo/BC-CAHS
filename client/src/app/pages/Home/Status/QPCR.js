import React from "react";

// Components
import { Grid } from "@mui/material";
import StatusChart from "./components/StatusChart";
import DetailStatus from "./components/DetailStatus";
import { getMockFormData } from "../../../../mocks/mock-sample";

const qPCR = () => {
  const [data, setData] = React.useState([]);
  const [formData, setFormData] = React.useState([]);
  const [selectedAnalysis, setSelectedAnalysis] = React.useState("PCR");


  React.useEffect(() => {
    let rawData = getMockFormData(1000);
    let dataObject = {};
    rawData.forEach((d) => {

      if (!dataObject[d.analysis_requested]) {
        dataObject[d.analysis_requested] = {
          name: d.analysis_requested,
          outstanding: 0,
          processing: 0,
          ready: 0
        };
      }
      dataObject[d.analysis_requested][d.status]++;
    });

    setData(Object.values(dataObject));
    setFormData(rawData);
  }, []);

  if (!data) return null;

  return (
    <Grid width="100%" height="100%" container>
      <Grid item xs={7.7}>
        <StatusChart data={data} onClick={(label) => setSelectedAnalysis(label)} />
      </Grid>
      <Grid item xs={4.3}
      >
        <DetailStatus
          selectedAnalysis={selectedAnalysis}
          data={formData.filter((form) => form.analysis_requested === selectedAnalysis)}
        />
      </Grid>
    </Grid>
  );
};

export default qPCR;