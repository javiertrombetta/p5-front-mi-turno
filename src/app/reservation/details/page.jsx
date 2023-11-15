import React from "react";
import { Typography, Button, Container, Grid, Paper } from "@mui/material";
import Navbar from "@/commons/Navbar";
import Footer from "@/commons/Footer";

const ReservationDetails = ({ reserva = {} }) => {
  const { id = "", fecha = "", hora = "", usuario = {} } = reserva;
  const { nombre = "", email = "" } = usuario;

  return (
    <>
      <Navbar />
      <Container>
        <Typography variant="h6" gutterBottom>
          Reserva ID: {id}
        </Typography>
        <Typography variant="h5">Fecha: {fecha}</Typography>
        <Typography variant="body1">Hora: {hora}</Typography>
        <Typography variant="body1">Usuario: {nombre}</Typography>
        <Typography variant="body1">Email: {email}</Typography>
        <Button color="primary">Botón Primario</Button>
        <Button color="secondary">Botón Secundario</Button>
      </Container>
      <Footer />
    </>
  );
};

export default ReservationDetails;
