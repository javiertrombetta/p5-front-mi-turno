import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const dataNewBranch = async (formData) => {
  try {
    const response = await axios.post(
      `${API_URL}/branches`,
      formData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default dataNewBranch;
