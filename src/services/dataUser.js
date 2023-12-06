import axios from 'axios';

const API_URL = process.env.API_URL;

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener todos los usuarios:", error);
    throw error;
  }
};
export const getAllOpersByBusiness = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/oper`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los operadores:", error);
    throw error;
  }
};
export const getUserInfo = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/me`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error al obtener la información del usuario:', error);
    throw error;
  }
};
export const getUserInfoById = async (dni) => {
  try {
    const response = await axios.get(`${API_URL}/users/${dni}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error al obtener la información del usuario:', error);
    throw error;
  }
};
export const updateMyInfo = async (userData) => {
  try {
    const response = await axios.put(`${API_URL}/users/me`, userData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar la información del usuario:', error);
    throw error;
  }
};
export const updateUserInfoByDni = async (userData) => {
  try {

    const { dni } = userData;   
    if (!dni) {
      throw new Error("DNI no proporcionado o indefinido");
    }

    const response = await axios.put(`${API_URL}/users/${dni}`, userData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
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
export const deleteUser = async (dni) => {
  try {
    await axios.delete(`${API_URL}/users/${dni}`, { withCredentials: true });
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    throw error;
  }
};
export const assignUserRole = async (dni, newRole) => {
  try {
    await axios.post(`${API_URL}/users/${dni}/assign-role`, { newRole }, { withCredentials: true });
  } catch (error) {
    console.error('Error al asignar rol:', error);
    throw error;
  }
};
export const sendMessage = async (message) => {
  try {
    const response = await axios.post(`${API_URL}/users/send-message`, { message }, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error al enviar el mensaje:", error);
    throw error;
  }
};
