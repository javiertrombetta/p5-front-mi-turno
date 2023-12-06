import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartPies = ({ data }) => {
  // Configuración de opciones del gráfico
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  // Preparar los datos para el gráfico de torta
  const chartData = {
    labels: ["Completadas", "No Completadas"],
    datasets: [
      {
        label: "Estado de las Reservas",
        data: [data.finished, data.notCompleted],
        backgroundColor: ["#CC6AFF", "#A442F1"],
      },
    ],
  };

  return <Pie data={chartData} options={options} className="h-full" />;
};

export default ChartPies;
