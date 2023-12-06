import axios from "axios";

const API_URL = process.env.API_URL;

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(
      `${API_URL}/users/forgot-password`,
      { email }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/users/reset-password`, {
      token,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
