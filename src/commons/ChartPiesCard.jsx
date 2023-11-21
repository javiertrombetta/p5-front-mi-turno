import ChartPies from "@/components/ChartPies";
import { Box, Button } from "@mui/material";
import React from "react";

const ChartPiesCard = () => {
  return (
    <Box
      border={1} // Grosor del borde
      borderRadius={5} // Radio de bordes para hacerlos redondeados
      borderColor="grey.300" // Color del borde
      p={2} // Padding interno
      boxShadow={3} // Sombra (opcional)
    >
      <ChartPies />
    </Box>
  );
};

export default ChartPiesCard;
