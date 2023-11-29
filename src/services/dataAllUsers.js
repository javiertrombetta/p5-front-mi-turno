import axios from "axios";

const API_URL = 'http://localhost:3000'; 

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`)
    return response.data;
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
    return null;
  }}