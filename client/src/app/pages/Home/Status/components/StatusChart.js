import React from "react";

// Components
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

// import { useTheme } from "@mui/material/styles";

const StatusChart = ({ data, onClick = () => {} }) => {
  if (!data) return null;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={1000}
        height={1000}
        layout={"vertical"}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 40,
          bottom: 5
        }}
        onClick={(e) => {
          onClick(e.activePayload[0].payload.key);
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="outstanding"
          stackId="a"
          fill="#8884d8"
          layout={"vertical"}
          // label={{ fill: "#fefefe", fontSize: 20 }}
        />
        <Bar
          dataKey="processing"
          stackId="a"
          fill="#fc32dd"
          layout={"vertical"}
          // label={{ fill: "#fefefe", fontSize: 20 }}
        />
        <Bar
          dataKey="ready"
          stackId="a"
          fill="#82ca9d"
          layout={"vertical"}
          // label={{ fill: "#fefefe", fontSize: 20 }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StatusChart;
