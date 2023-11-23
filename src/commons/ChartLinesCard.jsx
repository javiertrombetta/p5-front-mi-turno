import ChartLines from "@/components/ChartLines";
import { Box } from "@mui/material";
import React from "react";

const ChartLinesCard = () => {
  return (
    <Box
      border={1} // Grosor del borde
      borderRadius={5} // Radio de bordes para hacerlos redondeados
      borderColor="grey.300" // Color del borde
      p={2} // Padding interno
      boxShadow={3} // Sombra (opcional)
    >
      <ChartLines />
    </Box>
  );
};

export default ChartLinesCard;
