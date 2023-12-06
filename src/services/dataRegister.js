import axios from "axios";

const API_URL = process.env.API_URL;

const dataRegister = async (formData) => {
  try {
    const response = await axios.post(
      `${API_URL}/users/register`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default dataRegister;
