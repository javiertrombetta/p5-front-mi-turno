import axios from "axios";

const API_URL = "http://localhost:3000";

export const getMetricsData = async () => {
  try {
    const response = await axios.get(`${API_URL}/reservations/dashboard`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener las sucursales:",
      error.response?.data?.message || error.message
    );
    return null;
  }
};
