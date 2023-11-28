import axios from "axios";

const dataLogout = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/users/logout",
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
