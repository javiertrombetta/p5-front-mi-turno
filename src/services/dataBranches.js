import axios from "axios";

const API_URL = "http://localhost:3000";

export const getBranchesData = async () => {
  try {
    const response = await axios.get(`${API_URL}/branches/`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener las sucursales:", error.response?.data?.message || error.message);
    return null;
  }
};

export const getAvailableBranchSchedules = async (branchId, queryDate) => {
  try {
    const response = await axios.get(`${API_URL}/branches/${branchId}/available-schedules`, {
      params: { date: queryDate },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los horarios disponibles:", error.response?.data?.message || error.message);
    throw error;
  }
};