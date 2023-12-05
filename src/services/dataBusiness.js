import axios from "axios";

const API_URL = "http://localhost:3000";

export const getBusinessData = async () => {
  try {
    const response = await axios.get(`${API_URL}/business/`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener las empresas:", error.response?.data?.message || error.message);
    return null;
  }
};

export const getDataBusinessById = async (businessId) => {
  try {
    const response = await axios.get(`${API_URL}/business/${businessId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los detalles de la empresa:", error.response?.data?.message || error.message);
    return null;
  }
};


export const deleteBusiness = async (businessId) => {
  try {
    const response = await axios.delete(`${API_URL}/business/${businessId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la empresa:", error.response?.data?.message || error.message);
    throw error;
  }
};

export const updateBusiness = async (businessId, businessData) => {
  try {
    const response = await axios.put(`${API_URL}/business/${businessId}`, businessData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la empresa:", error.response?.data?.message || error.message);
    throw error;
  }
};
