import axios from "axios";

const dataNewBusiness = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/business",
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

export default dataNewBusiness;
