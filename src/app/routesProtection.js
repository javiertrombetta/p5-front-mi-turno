import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '@/services/dataLogin';
import { loginSuccess, logoutSuccess } from '@/hooks/slices/authSlice';
import Navbar from '@/commons/Navbar';
import Footer from '@/commons/Footer';
import Alert from '@/commons/Alert';
import MailButton from '@/components/MailButton';
import Loader from '@/components/Loader';

const RoutesProtection = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState({ open: false, message: '' });

  useEffect(() => {
    const checkUser = async () => {
      if (!user) {
        const axiosUser = await checkAuth();
        if (axiosUser) {
          dispatch(loginSuccess({ user: axiosUser }));
        } else {          
          dispatch(logoutSuccess());
        }
        setIsLoading(false);
      }
    };
    checkUser();
  }, [dispatch, user]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="root-container">
      {user && <Navbar />}
      <main className="main-content">{children}</main>
      {user && <Footer />}
      {user && user.role !== 'super' && <MailButton />}
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


