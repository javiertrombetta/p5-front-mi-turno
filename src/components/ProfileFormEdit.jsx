'use client';
import { Card, CardContent, Typography, Button, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import InputText from '@/commons/InputText';
import InputEmail from '@/commons/InputEmail';
import { updateMyInfo } from '@/services/dataUser';
import Alert from '@/commons/Alert';
import Loader from './Loader';

const ProfileFormEdit = ({ user, onUserUpdate }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: '',
    dni: '',
    email: '',
    phoneNumber: '',
    photo: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName,
        dni: user.dni,
        email: user.email,
        phoneNumber: user.phoneNumber,
        photo: user.photo,
      });

      // Cuando la información del usuario ha cargado, actualiza el estado de carga
      setLoading(false);
    }
  }, [user, router]);

  const [alert, setAlert] = useState({
    open: false,
    type: 'info',
    message: '',
  });

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setAlert({ open: true, type: 'info', message: 'Aplicando los cambios...' });

    try {
      const updatedUserData = {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        photo: formData.photo,
      };
      const response = await updateMyInfo(updatedUserData);

      onUserUpdate({ ...user, ...updatedUserData });
      setAlert({
        open: true,
        type: 'success',
        message: 'Perfil actualizado correctamente.',
      });
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
      setAlert({
        open: true,
        type: 'error',
        message:
          'Error al actualizar el perfil. Por favor, inténtelo de nuevo.',
      });
    }
  };

  const handleChangePassword = () => {
    router.push('/profile/changePassword');
  };

  if (loading) {
    return <Loader />; // Puedes mostrar un mensaje de carga aquí
  }

  if (!user) {
    return null;
  }

  return (
    <Card
      sx={{
        maxWidth: { xs: '100%', sm: '75%', md: '60%' },
        margin: 'auto',
        marginTop: '3em',
        padding: '2em',
      }}
    >
      <CardContent sx={{ width: '30em' }}>
        <Typography variant='h5' marginBottom='1em' gutterBottom>
          Editar Perfil
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={5}>
            <InputText
              label='Nombre y Apellido'
              name='fullName'
              value={formData.fullName}
              onChange={handleChange}
            />
            <InputText
              label='DNI'
              name='dni'
              value={formData.dni}
              disabled={true}
            />
            <InputEmail
              label='Email'
              name='email'
              value={formData.email}
              disabled={true}
            />
            <InputText
              label='Teléfono'
              name='phoneNumber'
              value={formData.phoneNumber}
              onChange={handleChange}
              type='tel'
            />
          </Stack>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            justifyContent='space-between'
            mt={5}
          >
            <Button
              variant='contained'
              color='secondary'
              onClick={handleChangePassword}
              sx={{ width: { md: '48%' }, fontSize: '0.8em', paddingY: '1em' }}
            >
              Cambiar contraseña
            </Button>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              sx={{ width: { md: '48%' }, fontSize: '0.8em' }}
            >
              Confirmar
            </Button>
          </Stack>
        </form>
      </CardContent>
      <Alert
        open={alert.open}
        type={alert.type}
        message={alert.message}
        onClose={handleCloseAlert}
      />
    </Card>
  );
};

export default ProfileFormEdit;
