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

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post('http://localhost:3000/users/reset-password', {
      token,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
