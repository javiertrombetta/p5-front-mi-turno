import axios from "axios";

const API_URL = "http://localhost:3000";

export const getMetricsData = async (branchId = null, selectedDate = null) => {
  try {
    let url = `${API_URL}/reservations/dashboard`;
    const params = {};
    if (branchId) {
      url += `/${branchId}`;    }
    if (selectedDate) {
      params.date = selectedDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    }    
    const response = await axios.get(url, { params, withCredentials: true });
    return response.data.metrics;
  } catch (error) {
    console.error("Error al obtener métricas:", error.message);
    throw error;
  }
};


