'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getReservationById,
  cancelReservation,
  updateReservationState,
  deleteReservation,
} from '@/services/dataReservation';
import {
  Typography,
  Container,
  Box,
  Button,
  Select,
  MenuItem,
} from '@mui/material';
import InputText from '@/commons/InputText';
import ConfirmCancelPopup from '@/components/PopupConfirmCancel';
import { useRouter } from 'next/navigation';
import Alert from '@/commons/Alert';
import QRCode from 'qrcode.react';
import dayjs from 'dayjs';
import Loader from '@/components/Loader';

const ViewReservation = ({ params }) => {
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [canCancel, setCanCancel] = useState(true);
  const router = useRouter();

  const [alertInfo, setAlertInfo] = useState({
    open: false,
    type: 'info',
    message: '',
  });

  const isSuperRole = useSelector((state) => state.auth.user?.role === 'super');
  const isUserRole = useSelector((state) => state.auth.user?.role === 'user');

  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const formatDate = (date) => {
    return dayjs(date).format('DD/MM/YYYY');
  };

  const formatTime = (time) => {
    return time.replace('::', ':').substring(0, 5);
  };

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const fetchedReservation = await getReservationById(params.id);
        setReservation({
          ...fetchedReservation,
          state: fetchedReservation.state.toUpperCase(),
          qrToken: fetchedReservation.qrToken,
        });
        checkIfCanCancel(fetchedReservation);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReservation();
  }, [params.id]);

  const checkIfCanCancel = (fetchedReservation) => {
    const reservationTime = dayjs(
      fetchedReservation.date + ' ' + fetchedReservation.time
    );
    const now = dayjs();
    const differenceInHours = reservationTime.diff(now, 'hour', true);
    setCanCancel(differenceInHours >= 2);
  };

  const handleSelectStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleChangeState = async () => {
    try {
      await updateReservationState(reservation.id, selectedState.toLowerCase());
      setReservation({
        ...reservation,
        state: selectedState.toUpperCase(),
      });
      setAlertInfo({
        open: true,
        type: 'success',
        message: 'Estado de la reserva actualizado con éxito.',
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        'Error al actualizar el estado de la reserva.';
      setAlertInfo({
        open: true,
        type: 'error',
        message: errorMessage,
      });
    }
  };

  const handleCancelClick = () => {
    if (!canCancel) {
      setAlertInfo({
        open: true,
        type: 'error',
        message:
          'No se puede cancelar la reserva dentro de las 2 horas previas a la misma.',
      });
      return;
    }
    setShowConfirmPopup(true);
  };

  const handleClosePopup = () => {
    setShowConfirmPopup(false);
  };

  const handleConfirmCancel = async () => {
    setShowConfirmPopup(false);
    setAlertInfo({
      open: true,
      type: 'info',
      message: 'Procesando cancelación...',
    });
    try {
      await cancelReservation(reservation.id);
      setAlertInfo({
        open: true,
        type: 'success',
        message: 'Reserva cancelada con éxito',
      });
      setTimeout(() => {
        router.push('/reservations');
      }, 3000);
    } catch (error) {
      console.error('Error al cancelar la reserva:', error);
      setAlertInfo({
        open: true,
        type: 'error',
        message: 'Error al cancelar la reserva',
      });
    }
  };
  const handleDeleteReservation = async () => {
    setAlertInfo({
      open: true,
      type: 'info',
      message: 'Eliminando reserva...',
    });
    try {
      await deleteReservation(reservation.id);
      setAlertInfo({
        open: true,
        type: 'success',
        message: 'Reserva eliminada con éxito',
      });
      setTimeout(() => {
        router.push('/reservations');
      }, 3000);
    } catch (error) {
      console.error('Error al eliminar la reserva:', error);
      setAlertInfo({
        open: true,
        type: 'error',
        message: 'Error al eliminar la reserva',
      });
    }
  };

  const handleBackToList = () => {
    router.push('/reservations');
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Typography color='error'>{error}</Typography>;
  }

  if (!reservation) {
    return <Typography>No se encontró la reserva.</Typography>;
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant='h5' sx={{ mb: 10 }}>
        Detalles de la Reserva
      </Typography>
      <Box className='print-section'>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Box sx={{ flexGrow: 1, pr: 3 }}>
            <InputText
              label='Número de reserva'
              value={reservation.id}
              disabled
            />
            <InputText
              label='Estado de la reserva'
              value={reservation.state}
              disabled
            />
            <InputText
              label='Nombre de la persona que asiste'
              value={reservation.clientName}
              disabled
            />
            <InputText
              label='Email de la persona que asiste'
              value={reservation.clientEmail}
              disabled
            />
          </Box>
          <Box sx={{ mt: 2, flexShrink: 0 }}>
            <QRCode value={reservation.qrToken} size={295} />
          </Box>
        </Box>
        <Box>
          <InputText
            label='Teléfono de la persona que asiste'
            value={reservation.clientPhone}
            disabled
            type='tel'
          />
          <InputText
            label='Fecha de la reserva'
            value={formatDate(reservation.date)}
            disabled
          />
          <InputText
            label='Horario elegido'
            value={formatTime(reservation.time)}
            disabled
          />
          <InputText
            label='Sucursal'
            value={reservation.branch.name}
            disabled
          />
          <InputText
            label='Empresa'
            value={reservation.branch.business.name}
            disabled
          />
          <InputText
            label='Dirección de la Sucursal'
            value={reservation.branch.address}
            disabled
          />
          <InputText
            label='Email de la sucursal'
            value={reservation.branch.email}
            disabled
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          variant='outlined'
          color='primary'
          onClick={handleBackToList}
          sx={{ px: 3, py: 1.5, fontSize: '1rem' }}
        >
          Volver al Listado
        </Button>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {!isUserRole && (
          <>
            <Select
              value={selectedState}
              onChange={handleSelectStateChange}
              displayEmpty
              sx={{ minWidth: 185, mr: 2, height: '3.3rem' }}
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
              onClick={handleChangeState}
              disabled={!selectedState}
              sx={{ px: 3, py: 1.5, fontSize: '1rem', mr: 2 }}
            >
              Cambiar Estado
            </Button>
          </>
          )}
          <Button
            variant='contained'
            color='secondary'
            onClick={handlePrint}
            sx={{ px: 3, py: 1.5, fontSize: '1rem', mr: 2 }}
          >
            Imprimir Detalle
          </Button>
          {!isSuperRole && (
            <Button
              variant='contained'
              color='error'
              onClick={handleCancelClick}
              disabled={!canCancel}
              sx={{ px: 3, py: 1.5, fontSize: '1rem' }}
            >
              Cancelar Reserva
            </Button>
          )}
          {isSuperRole && (
            <Button
              variant='contained'
              color='error'
              onClick={handleDeleteReservation}
              sx={{ px: 3, py: 1.5, fontSize: '1rem' }}
            >
              Eliminar Reserva
            </Button>
          )}
          <ConfirmCancelPopup
            open={showConfirmPopup}
            onClose={handleClosePopup}
            onConfirm={handleConfirmCancel}
          />
        </Box>
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
export default ViewReservation;
