'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Box, Typography, Button } from '@mui/material';
import InputText from '@/commons/InputText';
import Alert from '@/commons/Alert';
import { createBusiness } from '@/services/dataBusiness';
import Loader from '@/components/Loader';

const CreateBusiness = () => {
  const router = useRouter();
  const [business, setBusiness] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    type: 'info',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBusiness({ ...business, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertInfo({ open: true, type: 'info', message: 'Creando empresa...' });
    setLoading(true);
    try {
      await createBusiness(business);
      setAlertInfo({
        open: true,
        type: 'success',
        message: 'Empresa creada con éxito.',
      });
      router.push('/companies');
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Error al crear la empresa.';
      setAlertInfo({ open: true, type: 'error', message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <Typography variant='h4' sx={{ mb: 4 }}>
        Creación de Empresa
      </Typography>
      <Box component='form' onSubmit={handleSubmit} sx={{ mb: 4 }}>
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
          color='primary'
          type='submit'
          sx={{ px: 3, py: 1.5, fontSize: '1rem', mt: 4 }}
        >
          Crear Empresa
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

export default CreateBusiness;
