'use client';
import React, { useState, useEffect, useRef } from "react";
import Thanks from "@/components/ReservationThanks";
import ReservationDetails from "@/components/ReservationDetails";
import Alert from "@/commons/Alert";
import { Box, Card, Container, Divider } from "@mui/material";
import { getReservationById } from '@/services/dataReservation';

export default function ReservationSuccess({ params }) {
  const printRef = useRef();
  const handlePrint = () => {
    window.print();
  };
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
          setAlertInfo({
            open: true,
            type: 'error',
            message: 'Error al obtener los detalles de la reserva.'
          });
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
        <Box sx={{ my: 2 }}>
          <Thanks email={reservation.clientEmail} onPrint={handlePrint} />
        </Box>
        <Divider />
        <Box sx={{ my: 7 }}>
          <ReservationDetails ref={printRef} reservation={reservation} />
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
