import axios from "axios";

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/users/forgot-password",
      { email }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
