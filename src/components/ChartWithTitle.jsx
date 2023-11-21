import React from "react";
import Box, { Typography } from "@mui/material";
Typography;
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Con Antelación", reservas: 74 },
  { name: "Sin Antelación", reservas: 26 },
];

const ChartWithTitle = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Plazo de antelación de solicitud de las reservas
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="reservas" fill="#8A2BE2" name="Con Antelación" />
          <Bar dataKey="reservas" fill="#8884d8" name="Sin Antelación" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ChartWithTitle;
