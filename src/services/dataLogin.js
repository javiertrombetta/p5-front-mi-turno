import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const checkAuth = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/me`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return null;
    } else {
      console.error("Error al verificar la autenticación:", error);
      throw error;
    }
  }
};

export const loginUser = async (email, password) => {
  try {  
    const response = await axios.post(
      `${API_URL}/users/login`,
      { email, password },
      { withCredentials: true,
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        credentials: "include",
      }
      
    );
    return response.data.payload;
  } catch (error) { 
    throw error;
  }
};
