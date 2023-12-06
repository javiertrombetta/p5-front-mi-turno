import axios from "axios";

const API_URL = process.env.API_URL;

export const getTimesData = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/ruta-a-tu-api-de-horarios-por-sucursal`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener los horarios sucursales:", error);
    return null;
  }
};

export const dataTimes = [
  { id: 1, timetable: "10:00" },
  { id: 2, timetable: "10:30" },
  { id: 3, timetable: "11:00" },
  { id: 4, timetable: "11:30" },
  { id: 5, timetable: "12:00" },
  { id: 6, timetable: "12:30" },
  { id: 7, timetable: "13:00" },
];
