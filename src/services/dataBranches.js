import axios from "axios";

const API_URL = process.env.API_URL;

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

export const getBranchById = async (branchId) => {
  try {
    const response = await axios.get(`${API_URL}/branches/${branchId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los detalles de la sucursal:", error.response?.data?.message || error.message);
    throw error;
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

export const createBranch = async (branchData) => {
  try {
    const response = await axios.post(`${API_URL}/branches/`, branchData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear la sucursal:", error.response?.data?.message || error.message);
    throw error;
  }
};

export const updateBranch = async (branchId, branchData) => {
  try {
    const response = await axios.put(`${API_URL}/branches/${branchId}`, branchData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la sucursal:", error.response?.data?.message || error.message);
    throw error;
  }
};

export const updateBranchEnableStatus = async (branchId, isEnable) => {
  try {
    const response = await axios.put(`${API_URL}/branches/${branchId}/status`, { isEnable }, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el estado de habilitación de la sucursal:", error.response?.data?.message || error.message);
    throw error;
  }
};

export const deleteBranch = async (branchId) => {
  try {
    const response = await axios.delete(`${API_URL}/branches/${branchId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la sucursal:", error.response?.data?.message || error.message);
    throw error;
  }
};

export const getBranchesByBusiness = async (businessId) => {
  try {
    const response = await axios.get(`${API_URL}/branches/${businessId}/business`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener las sucursales:", error.response?.data?.message || error.message);
    throw error;
  }
};
