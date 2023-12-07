'use client';
import { useEffect, useState } from 'react';
import { Typography, Avatar, Snackbar, Alert } from '@mui/material';
import Loader from '@/components/Loader';

const UserInfo = ({ user }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return null;
  }

  const getInitials = (name) => {
    return name
      ? name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
      : '';
  };

  const avatarUrl =
    user.photo ||
    `https://via.placeholder.com/300?text=${getInitials(user.fullName)}`;

  return (
    <>
      <Avatar
        src={avatarUrl}
        alt={`${user.fullName}'s Avatar`}
        sx={{ width: 300, height: 300, margin: 'auto' }}
      />
      <Typography variant='h6' padding='1rem' gutterBottom>
        {user.fullName}
      </Typography>
      <Typography color='text.secondary'>D.N.I.: {user.dni}</Typography>
      <Typography color='text.secondary' gutterBottom>
        {user.email}
      </Typography>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity='warning'
          sx={{ width: '100%' }}
        >
          No hay un usuario. Redirigiendo a login...
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserInfo;
