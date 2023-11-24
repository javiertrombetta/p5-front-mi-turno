import axios from "axios";
import { setUser } from "../../hooks/slices/userSlice";

export const checkAuth = async (user, dispatch, router) => {
  try {
    if (user) {
      router.push("/reservation/my");
    } else {
      const response = await axios.get("http://localhost:3000/me", {
        withCredentials: true,
      });

      const userData = response.data;

      if (userData.dni) {
        dispatch(setUser(userData));
        router.push("/reservation/my");
      } else {
        console.error("Usuario no autenticado");
      }
    }
  } catch (error) {
    console.error("Error al verificar la autenticación:", error);
  }
};

export const loginUser = async (email, password, router, setError) => {
  try {
    await axios.post(
      "http://localhost:3000/users/login",
      { email, password },
      { withCredentials: true }
    );

    router.push("/reservation/process");
  } catch (error) {
    console.error("Error en loginUser:", error);
    setError(
      "Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo."
    );
  }
};
