import ChartLines from "@/components/ChartLines";
import { Box } from "@mui/material";
import React from "react";

const ChartLinesCard = () => {
  return (
    <Box
      border={1}
      borderRadius={5}
      borderColor="grey.300"
      p={2}
      boxShadow={3}
    >
      <ChartLines />
    </Box>
  );
};

export default ChartLinesCard;
