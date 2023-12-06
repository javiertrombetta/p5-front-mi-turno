import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Box } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ChartLinesCard = ({ metrics, selectedBranchId }) => {

  if (!metrics || typeof selectedBranchId === 'undefined') {
    return <Box>No hay datos disponibles.</Box>;
  }
  const totalNoShow = metrics.totalNoShow && metrics.totalNoShow[selectedBranchId] ? metrics.totalNoShow[selectedBranchId] : 0;
  const totalCancelled = metrics.totalCancellations && metrics.totalCancellations[selectedBranchId] ? metrics.totalCancellations[selectedBranchId] : 0;
  const totalFinished = metrics.totalFinished && metrics.totalFinished[selectedBranchId] ? metrics.totalFinished[selectedBranchId] : 0;
  const data = {
    labels: ["AUSENTES", "CANCELADAS", "FINALIZADAS"],
    datasets: [
      {
        label: "Cantidad",
        data: [totalNoShow, totalCancelled, totalFinished],
        tension: 0.5,
        fill: true,
        borderColor: "#CC6AFF",
        backgroundColor: "#A442F1",
        pointRadius: 5,
        pointBorderColor: "#CC6AFF",
        pointBackgroundColor: "#CC6AFF",
      }
    ],
  };
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        min: 0,
      },
      x: {
        ticks: { color: "rgb(1, 1, 1)" },
      },
    },
  };
  return (
    <Box border={1} borderRadius={5} borderColor="grey.300" p={2} boxShadow={3} style={{ height: '30em' }}>
      <Line data={data} options={options} />
    </Box>
  );
};

export default ChartLinesCard;
