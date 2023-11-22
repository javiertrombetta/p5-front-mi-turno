import ChartPies from "@/components/ChartPies";
import { Box, Button } from "@mui/material";
import React from "react";

const ChartPiesCard = () => {
  return (
    <Box border={1} borderRadius={5} borderColor="grey.300" p={2} boxShadow={3}>
      <ChartPies />
    </Box>
  );
};

export default ChartPiesCard;
