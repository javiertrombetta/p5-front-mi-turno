import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "@/hooks/slices/userSlice";

const getUserReservations = async () => {
  const user = useSelector(selectUser);
  console.log(user);
  try {
    const reservations = await axios.get(
      `http://localhost:3000/reservations/me`,
      { dni: user.dni },
      {
        withCredentials: true,
      }
    );
    console.log(reservations.data);
    return reservations.data.payload;
  } catch (error) {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error("Respuesta del servidor:", error.response.data);
      console.error("Código de estado:", error.response.status);
    } else if (error.request) {
      // La solicitud se hizo pero no se recibió respuesta
      console.error("No se recibió respuesta del servidor");
    } else {
      // Algo sucedió en la configuración de la solicitud que generó un error
      console.error("Error de configuración de la solicitud:", error.message);
    }
    throw error;
  }
};

export default getUserReservations;
