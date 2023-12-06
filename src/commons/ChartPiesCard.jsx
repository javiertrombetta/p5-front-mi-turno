import React from "react";
import ChartPies from "@/components/ChartPies";
import { Box } from "@mui/material";

const ChartPiesCard = ({ metrics, selectedBranchId }) => {
  // Verificar si los datos necesarios están disponibles
  if (!metrics || typeof selectedBranchId === 'undefined') {
    return <Box>No hay datos disponibles.</Box>;
  }

  // Obtener las métricas necesarias
  const totalFinished = metrics.totalFinished && metrics.totalFinished[selectedBranchId] ? metrics.totalFinished[selectedBranchId] : 0;
  const totalCancellations = metrics.totalCancellations && metrics.totalCancellations[selectedBranchId] ? metrics.totalCancellations[selectedBranchId] : 0;
  const totalNoShow = metrics.totalNoShow && metrics.totalNoShow[selectedBranchId] ? metrics.totalNoShow[selectedBranchId] : 0;

  // Preparar los datos para el gráfico de torta
  const chartData = {
    finished: totalFinished,
    notCompleted: totalCancellations + totalNoShow,
  };

  return (
    <Box border={1} borderRadius={5} borderColor="grey.300" p={2} boxShadow={3}>
      <ChartPies data={chartData} />
    </Box>
  );
};

export default ChartPiesCard;

