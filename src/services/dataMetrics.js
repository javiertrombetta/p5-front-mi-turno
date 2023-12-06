import axios from "axios";

const API_URL = "http://localhost:3000";

export const getMetricsData = async (branchId = null) => {
  try {
    let url = `${API_URL}/reservations/dashboard`;
    if (branchId) {
      url += `/${branchId}`;
    }
    const response = await axios.get(url, { withCredentials: true });
    return response.data.metrics;
  } catch (error) {
    console.error("Error al obtener métricas:", error.message);
    throw error;
  }
};


