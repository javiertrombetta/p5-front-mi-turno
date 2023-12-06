import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createReservation = async (reservationData) => {
  try {
    const response = await axios.post(
      `${API_URL}/reservations`,
      reservationData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error al crear la reserva:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};
export const getReservationsData = async () => {
  try {
    const response = await axios.get(`${API_URL}/reservations/me`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener las reservas del cliente:", error);
    throw error;
  }
};
export const getBranchReservations = async () => {
  try {
    const response = await axios.get(`${API_URL}/reservations/branch`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener las reservas de la sucursal:", error.response?.data?.message || error.message);
    throw error;
  }
};
export const getAllReservations = async () => {
  try {
    const response = await axios.get(`${API_URL}/reservations`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener todas las reservas:", error.response?.data?.message || error.message);
    throw error;
  }
};
export const getReservationById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/reservations/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener la reserva:", error.response?.data?.message || error.message);
    throw error;
  }
};
export const updateReservationState = async (reservationId, newState) => {
  try {
    const response = await axios.put(`${API_URL}/reservations/${reservationId}/status`, { state: newState }, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el estado de la reserva:", error.response?.data?.message || error.message);
    throw error;
  }
};
export const cancelReservation = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/reservations/${id}/cancel`, {}, { 
      withCredentials: true 
    });
    return response.data;
  } catch (error) {
    console.error("Error al cancelar la reserva:", error.response?.data?.message || error.message);
    throw error;
  }
};
export const deleteReservation = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/reservations/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la reserva:", error.response?.data?.message || error.message);
    throw error;
  }
};
export const getReservationByQrToken = async (qrToken) => {
  try {
    const response = await axios.get(`${API_URL}/reservations/qr/${qrToken}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener la reserva por QR token:", error.response?.data?.message || error.message);
    throw error;
  }
};
export const updateReservationStatusByQrToken = async (qrToken, newState) => {
  try {
    const response = await axios.put(`${API_URL}/reservations/qr/${qrToken}/status`, { state: newState }, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el estado de la reserva por QR token:", error.response?.data?.message || error.message);
    throw error;
  }
};