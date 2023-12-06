import axios from "axios";

const API_URL = process.env.API_URL;

const dataLogout = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/users/logout`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default dataLogout;
