import axios from "axios";

const getUserReservations = async () => {
  try {
    const reservations = await axios.get(
      `http://localhost:3000/reservations/me`,
      {
        withCredentials: true,
      }
    );

    return reservations.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getUserReservations;
