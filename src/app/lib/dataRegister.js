import axios from "axios";

const dataRegister = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/users/register",
      formData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default dataRegister;
