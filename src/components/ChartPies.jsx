import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

var options = {
  responsive: true,
  maintainAspectRatio: false,
};

var data = {
  labels: ["Asistencia", "Reservas"],
  datasets: [
    {
      label: "Reservas",
      data: [69, 31],
      backgroundColor: ["#CC6AFF", "#A442F1"],
    },
  ],
};

export default function ChartPies() {
  return <Pie data={data} options={options} className="h-full" />;
}
