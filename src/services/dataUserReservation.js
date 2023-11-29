import axios from "axios";

//create reservation
// const createUserReservation = async (reservationForm) => {
//   try {
//     const reservations = await axios.post(
//       "http://localhost:3000/reservations/create",
//       reservationForm
//     );
//     return reservations.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

//get reservations
const getUserReservations = async () => {
  try {
    const userInfo = await axios.get("http://localhost:3000/users/me", {
      withCredentials: true,
    });
    const reservations = await axios.get(
      `http://localhost:3000/reservations/me`,
      {
        withCredentials: true,
      }
    );

    return { userInfo: userInfo.data, reservations: reservations.data };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getUserReservations;
