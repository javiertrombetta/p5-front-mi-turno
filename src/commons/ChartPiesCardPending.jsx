// ChartPiesCardPending.js
import React from "react";
import ChartPies from "@/components/ChartPiesPending";
import { Box } from "@mui/material";

const ChartPiesCardPending = ({ metrics, selectedBranchId }) => {
  if (!metrics || typeof selectedBranchId === 'undefined') {
    return <Box>No hay datos disponibles.</Box>;
  }

  const totalPending = metrics.totalPending && metrics.totalPending[selectedBranchId] ? metrics.totalPending[selectedBranchId] : 0;
  const totalConfirmed = metrics.totalConfirmed && metrics.totalConfirmed[selectedBranchId] ? metrics.totalConfirmed[selectedBranchId] : 0;

  const chartData = {
    pending: totalPending,
    confirmed: totalConfirmed,
  };

  return (
    <Box border={1} borderRadius={5} borderColor="grey.300" p={2} boxShadow={3} style={{ height: '15em' }}>
      <ChartPies data={chartData} />
    </Box>
  );
};

export default ChartPiesCardPending;
