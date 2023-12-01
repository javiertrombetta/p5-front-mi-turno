import axios from "axios";

const API_URL = "http://localhost:3000";

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

export const getReservationById = async (reservationId) => {
  try {
    const response = await axios.get(
      `${API_URL}/reservations/${reservationId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener la reserva:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};
