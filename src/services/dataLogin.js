import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const checkAuth = async (user, router, dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/users/me`, {
      withCredentials: true,
    });
    const userData = response.data;
    return userData;
  } catch (error) {
    console.error("Error al verificar la autenticación:", error);
  }
};

export const loginUser = async (email, password) => {
  try {  
    const response = await axios.post(
      `${API_URL}/users/login`,
      { email, password },
      { withCredentials: true }
    );
    return response.data.payload;
  } catch (error) { 
    throw error;
  }
};
