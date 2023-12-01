import axios from "axios";

const dataNewBranch = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/branches",
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
