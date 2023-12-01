import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ButtonPersonalize from "@/commons/ButtonPersonalize";

const data = [
  { name: "Con Antelación", "Con Antelación": 74, "Sin Antelación": 0 },
  { name: "Sin Antelación", "Con Antelación": 0, "Sin Antelación": 26 },
];

const ChartWithTitle = () => {
  return (
    <Box
      border={1}
      borderRadius={5}
      borderColor="grey.300"
      p={2} 
      boxShadow={3}
    >
      <Typography variant="h6" gutterBottom>
        Plazo de antelación de solicitud de las reservas
      </Typography>
      <ButtonPersonalize />
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Legend />
          <Bar dataKey="Con Antelación" fill="#8A2BE2" />
          <Bar dataKey="Sin Antelación" fill="#FF0000" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ChartWithTitle;
