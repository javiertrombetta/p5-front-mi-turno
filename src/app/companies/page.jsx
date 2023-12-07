'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import Lists from '@/commons/Lists';
import Alert from '@/commons/Alert';
import { getBusinessData } from '@/services/dataBusiness';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';

const Businesses = () => {
  const { user } = useSelector((state) => state.auth);
  const isAdminOrSuper = user?.role === 'admin' || user?.role === 'super';
  const router = useRouter();
  const [businesses, setBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [selectedBusinesses, setSelectedBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    type: 'info',
    message: '',
  });

  useEffect(() => {
    fetchBusinesses();
    if (isAdminOrSuper) {
      fetchBusinesses();
    }
  }, [isAdminOrSuper]);

  const fetchBusinesses = async () => {
    setLoading(true);
    try {
      const data = await getBusinessData();
      setBusinesses(data);
      setFilteredBusinesses(data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Error al cargar las empresas.';
      setAlertInfo({ open: true, type: 'error', message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtered = businesses.filter((business) =>
      Object.values(business).some((value) => {
        const stringValue =
          value === null || value === undefined ? '' : value.toString();
        return stringValue.toLowerCase().includes(filter.toLowerCase());
      })
    );
    setFilteredBusinesses(filtered);
  }, [filter, businesses]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleCreateBusiness = () => {
    router.push('/companies/manage');
  };

  const handleRowClick = (businessId) => {
    router.push(`/companies/manage/${businessId}`);
  };

  const columns = ['Nombre', 'Email', 'Teléfono', 'Dirección'];
  const columnMappings = {
    Nombre: 'name',
    Email: 'email',
    Teléfono: 'phoneNumber',
    Dirección: 'address',
  };

  if (loading) {
    return <Loader />;
  }

  if (businesses.length === 0) {
    return (
      <Container
        maxWidth='xl'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '15em',
        }}
      >
        <Typography variant='h6' sx={{ textAlign: 'center' }}>
          No se encontraron empresas.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth='xl'>
      <Box sx={{ mx: 10 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          {user?.role === 'super' && (
            <Button variant='contained' onClick={handleCreateBusiness}>
              Crear Empresa
            </Button>
          )}
          <TextField
            label='Filtrar Empresas'
            variant='outlined'
            value={filter}
            onChange={handleFilterChange}
            sx={{ width: '50%' }}
          />
        </Box>
        <Lists
          data={filteredBusinesses}
          columns={columns}
          columnMappings={columnMappings}
          onRowClick={handleRowClick}
          showCheckboxAndControls={false}
        />
      </Box>
      <Alert
        open={alertInfo.open}
        type={alertInfo.type}
        message={alertInfo.message}
        onClose={() => setAlertInfo({ ...alertInfo, open: false })}
      />
    </Container>
  );
};

export default Businesses;
