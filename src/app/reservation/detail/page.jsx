import React from "react";
import Thanks from "@/components/ReservationThanks";
import ReservationDetails from "@/components/ReservationDetails";
import { Box, Card, Container, Divider } from "@mui/material";

export default function ReservationSuccess() {

  const reservationExample = {
    id: "123456",
    fechaCreacion: "01/10/2023",
    horaCreacion: "15:30",
    fechaReserva: "15/10/2023",
    horaReserva: "18:00",
    nombreCliente: "Facundo Velasco",
    mailCliente: "facundo@velasco.com",
    telefonoCliente: "0800123456",
    nombreSucursal: "Sucursal Centro"
  };

  return (
    <Container maxWidth="lg">
      <Card variant="none">
        <Box sx={{ my: 10 }}>
          <Thanks email={reservationExample.mailCliente} />
        </Box>
        <Divider />
        <Box sx={{ my: 10 }}>
          <ReservationDetails reservation={reservationExample} />
        </Box>
      </Card>
    </Container>
  );
}
