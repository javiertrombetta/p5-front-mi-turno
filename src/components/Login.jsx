import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputEmail from '@/commons/InputEmail';
import InputPassword from '@/commons/InputPassword';
import Alert from '@/commons/Alert';
import { loginUser } from '@/services/dataLogin';
import { loginSuccess } from '@/hooks/slices/authSlice';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const { user } = useSelector((state) => state.auth);
  const { isLogged } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [alert, setAlert] = useState({
    open: false,
    type: 'info',
    message: '',
  });
  const router = useRouter();
  const dispatch = useDispatch();

  /* useEffect(() => {
    if (user) {
      switch (user.role) {
        case 'super':
          router.push('/dashboard');
          break;
        case 'admin':
          router.push('/dashboard');
          break;
        case 'oper':
          router.push('/reservations');
          break;
        case 'user':
          router.push('/reservations');
          break;
        default:
          console.error(
            'Rol desconocido. Por favor, ingresá con tus credenciales al sistema.'
          );
      }
    }
  }, [router, user]); */

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogged) return;
    setAlert({ open: true, type: 'info', message: 'Accediendo...' });
    try {
      const response = await loginUser(formData.email, formData.password);
      setTimeout(() => {
        dispatch(
          loginSuccess({
            user: response,
          })
        );
        switch (response.role) {
          case 'super':
            router.push('/dashboard');
            break;
          case 'admin':
            router.push('/dashboard');
            break;
          case 'oper':
            router.push('/reservations');
            break;
          case 'user':
            router.push('/reservations');
            break;
          default:
            console.error('Rol desconocido');
        }
      }, 500);
    } catch (error) {
      let message = 'Error de servidor o conexión';
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message = error.response.data.message;
      } else if (error.message) {
        message = error.message;
      }
      setAlert({
        open: true,
        type: 'error',
        message: message,
      });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Container component='main' maxWidth='xs' sx={{ marginTop: '5rem' }}>
      {<CssBaseline />}
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ mb: 2, p: 4, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Iniciar Sesión
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
          <InputEmail
            label='Correo Electrónico'
            name='email'
            value={formData.email}
            onChange={handleChange}
            showHelperOnBlur={false}
          />
          <InputPassword
            label='Contraseña'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            sx={{
              textTransform: 'capitalize',
              color: 'white',
              ':hover': { bgcolor: 'primary.dark', color: 'white' },
              mt: 5,
              mb: 2,
              py: 2,
            }}
          >
            Iniciar Sesión
          </Button>
          <Link
            href='/forgot-password'
            variant='body2'
            sx={{
              textDecoration: 'none',
              ':hover': {
                color: 'var(--primary-dark)',
              },
            }}
          >
            ¿Olvidaste tu contraseña?
          </Link>
          <Link
            href='/register'
            variant='body2'
            sx={{
              textDecoration: 'none',
              display: 'block',
              mt: 2,
              ':hover': {
                color: 'var(--primary-dark)',
              },
            }}
          >
            ¿No tienes cuenta? Regístrate
          </Link>
        </Box>
      </Box>
      <Alert
        open={alert.open}
        type={alert.type}
        message={alert.message}
        onClose={handleCloseAlert}
      />
    </Container>
  );
}
