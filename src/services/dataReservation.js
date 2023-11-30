import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const createReservation = async (reservationData) => {
  try {
    const response = await axios.post(`${API_URL}/reservations`, reservationData, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error al crear la reserva:', error.response?.data?.message || error.message);
    throw error;
  }
};
