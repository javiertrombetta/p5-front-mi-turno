"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "@/services/dataLogin";
import { loginSuccess, logoutSuccess } from "@/hooks/slices/authSlice";
import Navbar from "@/commons/Navbar";
import Footer from "@/commons/Footer";
import { useRouter } from "next/navigation";
import Alert from "@/commons/Alert";

const RoutesProtection = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [alert, setAlert] = useState({ open: false, message: '' });

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const user = await checkAuth();
        if (user) {
          dispatch(loginSuccess(user));
        }
        else {    
          dispatch(logoutSuccess());          
          throw new Error('No autenticado');
        }
      } catch (error) {
        console.error("Error en autenticación:", error);
        setAlert({ open: true, message: 'Error de autenticación. Redirigiendo...' });        
      }
    };

    authenticateUser();
  }, [dispatch, router]);

  return (
    <>
      {isAuthenticated && <Navbar />}
      <div style={{ marginTop: "3em", minHeight: "calc(100vh - 128px)" }}>
        {children}
      </div>
      {isAuthenticated && <Footer />}
      {alert.open && <Alert message={alert.message} />}
    </>
  );
};

export default RoutesProtection;

