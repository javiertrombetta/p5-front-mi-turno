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

var reservas = [0, 12, 44, 26, 18, 30];
var meses = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

var midata = {
  labels: meses,
  datasets: [
    {
      label: "Reservas",
      data: reservas,
      tension: 0.5,
      fill: true,
      borderColor: "#CC6AFF",
      backgroundColor: "#A442F1",
      pointRadius: 5,
      pointBorderColor: "#CC6AFF",
      pointBackgroundColor: "#CC6AFF",
    },
    {
      label: "Cancelaciones",
      data: [20, 25, 60, 65, 45, 10, 0, 25, 35, 7, 20, 25],
      backgroundColor: "#CC6AFF",
    },
  ],
};

var misoptions = {
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    y: {
      min: 0,
    },
    x: {
      ticks: { color: "rgb(255, 99, 132)" },
    },
  },
};

export default function ChartLines() {
  return <Line data={midata} options={misoptions} />;
}
