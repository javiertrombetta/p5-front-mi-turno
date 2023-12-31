'use client';
import React, { useState, useEffect } from "react";
import Thanks from "@/components/ReservationThanks";
import ReservationDetails from "@/components/ReservationDetails";
import Alert from "@/commons/Alert";
import { Box, Card, Container, Divider } from "@mui/material";
import { getReservationById } from '@/services/dataReservation';

export default function ReservationSuccess({ params }) {
  const [reservation, setReservation] = useState(null);
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    type: 'info',
    message: ''
  });

  useEffect(() => {
    const fetchReservationDetails = async () => {
      const reservationId = params.id;
      if (reservationId) {
        setAlertInfo({
          open: true,
          type: 'info',
          message: 'Cargando la información ...'
        });
        try {
          const reservationData = await getReservationById(reservationId);      
          setReservation(reservationData);
          setAlertInfo({ open: false });
        } catch (error) {
          const errorMessage = error.response?.data?.message || `Error al obtener los detalles de la reserva.`;
          setAlertInfo({ open: true, type: 'error', message: errorMessage });            
        }
      }
    };
    fetchReservationDetails();
  }, [params.id]);

  const handleCloseAlert = () => {
    setAlertInfo({ ...alertInfo, open: false });
  };

  if (!reservation) {
    return <div>Cargando...</div>;
  }

  return (
    <Container maxWidth="lg">
      <Card variant="none">
        <Box sx={{ mb: 5 }}>
          <Thanks email={reservation.clientEmail} reservationId={reservation.id} />
        </Box>
        <Divider />
        <Box sx={{ mt: 6 }}>
          <ReservationDetails reservation={reservation} />
        </Box>
      </Card>
      <Alert
        open={alertInfo.open}
        type={alertInfo.type}
        message={alertInfo.message}
        onClose={handleCloseAlert}
      />
    </Container>
  );
}