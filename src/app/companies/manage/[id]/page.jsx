'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import InputText from '@/commons/InputText';
import Alert from '@/commons/Alert';
import {
  getDataBusinessById,
  deleteBusiness,
  updateBusiness,
} from '@/services/dataBusiness';
import Loader from '@/components/Loader';

const ManageBusiness = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    type: 'info',
    message: '',
  });

  useEffect(() => {
    const fetchBusiness = async () => {
      setLoading(true);
      try {
        const data = await getDataBusinessById(id);
        setBusiness(data);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          'Error al obtener la información de la empresa.';
        setAlertInfo({ open: true, type: 'error', message: errorMessage });
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchBusiness();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBusiness({ ...business, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertInfo({ open: true, type: 'info', message: 'Procesando...' });
    setLoading(true);
    try {
      await updateBusiness(id, business);
      setAlertInfo({
        open: true,
        type: 'success',
        message: 'Empresa actualizada con éxito.',
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Error al actualizar la empresa.';
      setAlertInfo({ open: true, type: 'error', message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteBusiness(id);
      setAlertInfo({
        open: true,
        type: 'success',
        message: 'Empresa eliminada con éxito.',
      });
      router.push('/companies');
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Error al eliminar la empresa.';
      setAlertInfo({ open: true, type: 'error', message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Typography color='error'>{error}</Typography>;
  }

  if (!business) {
    return <Typography>No se encontró la empresa.</Typography>;
  }

  return (
    <Container>
      <Typography variant='h4' sx={{ mb: 4 }}>
        Gestión de Empresa
      </Typography>
      <Box component='form' onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <InputText
          label='Número de Empresa'
          name='id'
          value={business.id}
          onChange={handleInputChange}
          disabled={true}
        />
        <InputText
          label='Nombre'
          name='name'
          value={business.name}
          onChange={handleInputChange}
        />
        <InputText
          label='Email'
          name='email'
          value={business.email}
          onChange={handleInputChange}
        />
        <InputText
          label='Teléfono'
          name='phoneNumber'
          value={business.phoneNumber}
          onChange={handleInputChange}
        />
        <InputText
          label='Dirección'
          name='address'
          value={business.address}
          onChange={handleInputChange}
        />
        <Button
          variant='contained'
          color='error'
          onClick={handleDelete}
          sx={{ px: 3, py: 1.5, fontSize: '1rem', mt: 4, ml: 2 }}
        >
          Eliminar Empresa
        </Button>
        <Button
          variant='contained'
          color='primary'
          type='submit'
          sx={{ px: 3, py: 1.5, fontSize: '1rem', mt: 4, ml: 2 }}
        >
          Actualizar Empresa
        </Button>
        <Button
          variant='outlined'
          color='primary'
          onClick={() => router.back()}
          sx={{ px: 3, py: 1.5, fontSize: '1rem', mt: 4, ml: 2 }}
        >
          Volver
        </Button>
        <Alert
          open={alertInfo.open}
          type={alertInfo.type}
          message={alertInfo.message}
          onClose={() => setAlertInfo({ ...alertInfo, open: false })}
        />
      </Box>
    </Container>
  );
};

export default ManageBusiness;
