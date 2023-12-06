// ChartPies.js
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartPies = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };
  const chartData = {
    labels: ["Pendientes", "Confirmadas"],
    datasets: [
      {
        label: "Cantidad",
        data: [data.pending, data.confirmed],
        backgroundColor: ["#CC6AFF", "#A442F1"],
      },
    ],
  };

  return <Pie data={chartData} options={options} className="h-full" />;
};

export default ChartPies;
