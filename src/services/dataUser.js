import axios from 'axios';

const API_URL = 'http://localhost:3000'; 

export const getUserInfo = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/me`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error al obtener la información del usuario:', error);
    throw error;
  }
};

export const updateUserInfo = async (userData) => {
  try {
    const response = await axios.put(`${API_URL}/users/me`, userData, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar la información del usuario:', error);
    throw error;
  }
};

export const changeUserPassword = async (currentPassword, newPassword) => {
  try {
    const response = await axios.put(
      `${API_URL}/users/me/change-password`, 
      { currentPassword, newPassword },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error);
    throw error;
  }
};