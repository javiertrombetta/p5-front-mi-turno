"use client";
import React, { useState, useEffect } from "react"; // -> solo React
import { useDispatch, useSelector } from "react-redux"; // -> prueba
import { checkAuth } from "@/services/dataLogin"; // -> prueba
import { loginSuccess, logoutSuccess } from "@/hooks/slices/authSlice"; // -> prueba
import CreateBusiness from "@/components/CreateBusiness"; // -> dejar siempre
import { useRouter } from "next/navigation"; // -> prueba
import { PersistGate } from "redux-persist/integration/react"; // -> prueba
import { persistor } from "@/hooks/store"; // -> prueba
import CircularProgress from "@mui/material/CircularProgress"; // -> prueba

function CreateNewBusiness() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const axiosUser = await checkAuth();
        if (axiosUser) {
          dispatch(loginSuccess({ user: axiosUser }));
        } else {
          dispatch(logoutSuccess());
          persistor.purge();
        }
      } catch (error) {
        console.error("Error en autenticación:", error);
        dispatch(logoutSuccess());
        persistor.purge();
      } finally {
        setIsLoading(false);
      }
    };
    authenticateUser();
  }, [dispatch]);
  return (
    <PersistGate loading={null} persistor={persistor}>
    {isLoggedIn ? (
      <>
        {user.role === "super" && <CreateBusiness />}
        {user.role === "user" && <h2 style={{textAlign: "center"}}>Lo siento, aqui solo puede acceder un administrador.</h2>}
        {user.role === "admin" && <h2 style={{textAlign: "center"}}>Lo siento, aqui solo puede acceder un administrador.</h2>}
      </>
    ) : (<h2 style={{textAlign: "center"}}>Debes iniciar sesión para poder crear una sucursal.</h2>)}
    {/* <div style={{ marginTop: "3em", minHeight: "calc(100vh - 128px)" }}>
      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress />
        </div>
      
      )}
    </div> */}
    {/* {isLoggedIn && <Footer />} */}
    {alert.open && (
      <Alert
        message={alert.message}
        onClose={() => setAlert({ ...alert, open: false })}
      />
    )}
  </PersistGate>
  );
}

export default CreateNewBusiness;
