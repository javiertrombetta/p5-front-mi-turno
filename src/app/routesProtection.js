'use client';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "@/services/dataLogin";
import { loginSuccess, logoutSuccess } from "@/hooks/slices/authSlice";
import Navbar from "@/commons/Navbar";
import Footer from "@/commons/Footer";
import { useRouter } from "next/navigation";
import Alert from '@/commons/Alert';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from "@/hooks/store";
import CircularProgress from '@mui/material/CircularProgress';

const RoutesProtection = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState({ open: false, message: '' });

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
      {isLoggedIn && <Navbar />}
      <div style={{ marginTop: "3em", minHeight: "calc(100vh - 128px)" }}>
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </div>
        ) : (
          children
        )}
      </div>
      {isLoggedIn && <Footer />}
      {alert.open && <Alert message={alert.message} onClose={() => setAlert({ ...alert, open: false })} />}
    </PersistGate>
  );
};

export default RoutesProtection;


