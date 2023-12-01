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

export const getReservationsData = async () => {
  try {
    const response = await axios.get(`${API_URL}reservations/me`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener las reservas del cliente:", error);
    return null;
  }
};

export const getReservationById = async (reservationId) => {
  try {
    const response = await axios.get(`${API_URL}/reservations/${reservationId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener la reserva:", error.response?.data?.message || error.message);
    throw error;
  }
};

export const reservationsData = [
  {
    id: 1,
    apenom: "Facundo Velasco",
    reservationDate: "15/12/2023",
    reservationTime: "09:30",
    branchName: "Sucursal Norte",
    reservation_id: "1141472791015",
  },
  {
    id: 2,
    apenom: "Laura Martínez",
    reservationDate: "16/12/2023",
    reservationTime: "10:00",
    branchName: "Sucursal Centro",
    reservation_id: "2141472791025",
  },
  {
    id: 3,
    apenom: "Miguel Ángel",
    reservationDate: "17/12/2023",
    reservationTime: "11:30",
    branchName: "Sucursal Este",
    reservation_id: "3141472791035",
  },
  {
    id: 4,
    apenom: "Sofía Castro",
    reservationDate: "18/12/2023",
    reservationTime: "12:00",
    branchName: "Sucursal Oeste",
    reservation_id: "4141472791045",
  },
  {
    id: 5,
    apenom: "Carlos Pérez",
    reservationDate: "19/12/2023",
    reservationTime: "13:30",
    branchName: "Sucursal Sur",
    reservation_id: "5141472791055",
  },
  {
    id: 6,
    apenom: "Lucía Gómez",
    reservationDate: "20/12/2023",
    reservationTime: "14:00",
    branchName: "Sucursal Franco",
    reservation_id: "6141472791065",
  },
  {
    id: 7,
    apenom: "Esteban Quito",
    reservationDate: "21/12/2023",
    reservationTime: "15:30",
    branchName: "Sucursal Darío",
    reservation_id: "7141472791075",
  },
  {
    id: 8,
    apenom: "Ana María",
    reservationDate: "22/12/2023",
    reservationTime: "16:00",
    branchName: "Sucursal Este",
    reservation_id: "8141472791085",
  },
  {
    id: 9,
    apenom: "Juan Domínguez",
    reservationDate: "23/12/2023",
    reservationTime: "17:30",
    branchName: "Sucursal Oeste",
    reservation_id: "9141472791095",
  },
  {
    id: 10,
    apenom: "María Fernanda",
    reservationDate: "24/12/2023",
    reservationTime: "18:00",
    branchName: "Sucursal Centro",
    reservation_id: "10141472791005",
  },
];
