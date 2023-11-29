import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Asegúrate de que la URL es correcta

export const getUserData = async () => {
  try {
    const response = await axios.get(`${API_URL}/ruta-a-tu-api-de-usuario`, {
      withCredentials: true // si estás usando cookies
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
    return null;
  }
};