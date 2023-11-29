import axios from "axios";

export const checkAuth = async (user, router, dispatch) => {
  try {
    const response = await axios.get("http://localhost:3000/users/me", {
      withCredentials: true,
    });
    const userData = response.data;
    return userData;
  } catch (error) {
    console.error("Error al verificar la autenticación:", error);
  }
};

export const loginUser = async (email, password, setError) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/users/login",
      { email, password },
      { withCredentials: true }
    );
    return response.data.payload;
  } catch (error) {
    console.error("Error en loginUser:", error);
    setError(
      "Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo."
    );
    throw error;
  }
};
