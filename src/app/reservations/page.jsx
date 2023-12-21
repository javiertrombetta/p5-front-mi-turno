'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  TextField,
  Container,
  Box,
  Button,
  Select,
  MenuItem,
  Paper,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import Lists from '@/commons/Lists';
import Alert from '@/commons/Alert';
import {
  getReservationsData,
  getBranchReservations,
  getAllReservations,
  updateReservationState,
} from '@/services/dataReservation';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Loader from '@/components/Loader';

dayjs.extend(utc);

const Reservations = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const [reservations, setReservations] = useState([]);
  const [selectedReservations, setSelectedReservations] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    type: 'info',
    message: '',
  });

  const isUserRole = user?.role === 'user';

  useEffect(() => {
    const fetchAndFormatReservations = async () => {
      try {
        let data;
        if (user.role === 'super') {
          data = await getAllReservations();
        } else if (user.role === 'oper') {
          data = await getBranchReservations();
        } else {
          data = await getReservationsData();
        }
    
        const formattedData = data.map((item) => {
          const branchName = item.branch ? item.branch.name : "No especificado";
          const dateTime = dayjs.utc(item.date).local().format('DD/MM/YYYY HH:mm');
    
          return {
            ...item,
            dateTime,
            branchName,
            state: item.state.toUpperCase(),
          };
        });
    
        setReservations(formattedData);
      } catch (error) {
        const errorMessage = error.response?.data?.message || `Error al cargar las reservas.`;
        setAlertInfo({ open: true, type: 'error', message: errorMessage });
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchAndFormatReservations();
    }
  }, [user]);

  const filteredReservations = reservations.filter((reservation) =>
    Object.values(reservation).some((value) => {
      const valueString = value ? value.toString() : '';
      return valueString.toLowerCase().includes(filter.toLowerCase());
    })
  );

  const handleClearSelection = () => {
    setSelectedReservations([]);
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleChangeReservationState = async () => {
    setAlertInfo({
      open: true,
      type: 'info',
      message: 'Actualizando estado...',
    });
  
    let updatedReservations = [...reservations];
    let promises = [];
    let errors = [];
  
    selectedReservations.forEach((reservationId) => {
      const promise = updateReservationState(
        reservationId,
        selectedState.toLowerCase()
      )
        .then(() => {
          updatedReservations = updatedReservations.map((reservation) =>
            reservation.id === reservationId
              ? { ...reservation, state: selectedState.toUpperCase() }
              : reservation
          );
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data?.message ||
            `Error al actualizar el estado de la reserva con ID: ${reservationId}`;
          errors.push(errorMessage);
        });
  
      promises.push(promise);
    });
  
    try {
      await Promise.all(promises);
  
      if (errors.length === 0) {
        setReservations(updatedReservations);
        setAlertInfo({
          open: true,
          type: 'success',
          message: 'Estado(s) de la(s) reserva(s) actualizado(s) con éxito.',
        });
      } else {
        setAlertInfo({
          open: true,
          type: 'error',
          message: `Se produjeron errores al actualizar algunas reservas. Detalles: ${errors.join(', ')}`,
        });
      }
    } catch (allErrors) {
      console.error(allErrors);
      setAlertInfo({
        open: true,
        type: 'error',
        message: 'Se produjo un error al actualizar las reservas.',
      });
    } finally {
      setSelectedReservations([]);
      setSelectedState('');
    }
  };
  const handleCheckboxChange = (reservationId) => {
    setSelectedReservations((prev) =>
      prev.includes(reservationId)
        ? prev.filter((id) => id !== reservationId)
        : [...prev, reservationId]
    );
  };

  const handleCreateReservation = () => {
    router.push('/reservations/new-reservation');
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleRowClick = (reservationId) => {
    router.push(`/reservations/view-reservation/${reservationId}`);
  };

  const handleCloseAlert = () => {
    setAlertInfo({ ...alertInfo, open: false });
  };

  if (!user) {
    return <Loader/>;
  }
  if (loading) {
    return <Loader/>;
  }

  const hasReservations = filteredReservations.length > 0;
/*
  if (reservations.length === 0) {
    return (
      <Container
        maxWidth='xl'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '20em',
        }}
      >
        {isUserRole ? (
          <Paper elevation={5} sx={{ textAlign: 'center' }}>
            <Button
              variant='contained'
              onClick={handleCreateReservation}
              sx={{ padding: '2rem', fontSize: '1em' }}
            >
              Empezar creando una nueva reserva
            </Button>
          </Paper>
        ) : (
          <Typography variant='h6' sx={{ textAlign: 'center' }}>
            No hay reservas disponibles en este momento.
          </Typography>
        )}
      </Container>
    );
  }*/

  const columns = [
    'N° de la reserva',
    '¿Quién asiste?',
    '¿Cuándo?',
    'Sucursal',
    'Estado',
  ];
  const columnMappings = {
    'N° de la reserva': 'id',
    '¿Quién asiste?': 'clientName',
    '¿Cuándo?': 'dateTime',
    'Sucursal': 'branchName',
    'Estado': 'state',
  };

  return (
    <Container maxWidth='xl'>
      <Box sx={{ mx: 10 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          {isUserRole && (
            <Button
              variant='outlined'
              onClick={handleCreateReservation}
              sx={{ padding: '1rem', fontSize: '0.9em' }}
            >
              Nueva Reserva
            </Button>
          )}
          <TextField
            label='Filtrar Reservas'
            variant='outlined'
            value={filter}
            onChange={handleFilterChange}
            sx={{ width: '50%' }}
          />
  
          {!isUserRole && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant='outlined'
                onClick={handleClearSelection}
                sx={{ padding: '1rem', fontSize: '0.9em' }}
              >
                Limpiar seleccionados
              </Button>
              <Select
                value={selectedState}
                onChange={handleStateChange}
                displayEmpty
                sx={{ minWidth: 185 }}
              >
                <MenuItem value=''>
                  <em>Seleccionar Estado</em>
                </MenuItem>
                <MenuItem value='Pendiente'>Pendiente</MenuItem>
                <MenuItem value='Confirmado'>Confirmado</MenuItem>
                <MenuItem value='Cancelado'>Cancelado</MenuItem>
                <MenuItem value='Finalizado'>Finalizado</MenuItem>
                <MenuItem value='Ausente'>Ausente</MenuItem>
              </Select>
              <Button
                variant='contained'
                onClick={handleChangeReservationState}
                disabled={selectedReservations.length === 0 || !selectedState}
              >
                Cambiar Estado
              </Button>
            </Box>
          )}
        </Box>  
        {hasReservations ? (
          <Lists
            data={filteredReservations}
            columns={columns}
            columnMappings={columnMappings}
            onRowClick={handleRowClick}
            selectedItems={selectedReservations}
            onCheckboxChange={handleCheckboxChange}
            showCheckboxAndControls={!isUserRole}
          />
        ) : (
          <Typography variant='h6' sx={{ textAlign: 'center', mt: 5 }}>
            No se encontraron reservas en la búsqueda.
          </Typography>
        )}
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

export default Reservations;
