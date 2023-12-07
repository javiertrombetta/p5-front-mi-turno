'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '@/services/dataLogin';
import {
  loginSuccess,
  logoutSuccess,
  isLoggedIn,
} from '@/hooks/slices/authSlice';
import Navbar from '@/commons/Navbar';
import Footer from '@/commons/Footer';
import Alert from '@/commons/Alert';
import MailButton from '@/components/MailButton';
import Loader from '@/components/Loader';

const RoutesProtection = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isLogged } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState();
  const [alert, setAlert] = useState({ open: false, message: '' });

  useEffect(() => {
    const checkUser = async () => {
      if (user) {
        dispatch(isLoggedIn());
      } else {
        try {
          const axiosUser = await checkAuth();
          if (axiosUser) {
            dispatch(loginSuccess({ user: axiosUser }));
          } else {
            dispatch(logoutSuccess());
          }
        } catch (error) {
          console.error('Error en autenticación:', error);
          dispatch(logoutSuccess());
        } finally {
          setIsLoading(false);
        }
      }
    };
    checkUser();
  }, [dispatch, user, isLogged]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      {isLogged && <Navbar />}
      <main style={{ flex: 1, marginTop: '3em' }}>{children}</main>
      {isLogged && <Footer />}
      {isLogged && user.role != 'super' && <MailButton />}
      {alert.open && (
        <Alert
          message={alert.message}
          onClose={() => setAlert({ ...alert, open: false })}
        />
      )}
    </div>
  );
};

export default RoutesProtection;
