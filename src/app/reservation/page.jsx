"use client";

import React from "react";
import { Box, Container, Typography } from "@mui/material";
import BranchesList from "@/commons/Lists";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import { reservationsData } from "@/services/dataReservation";

const formatHour = (hour) => {
  const [hrs, mins] = hour.split(":");
  return `${hrs.length === 1 ? "0" + hrs : hrs}:${mins}`;
};

const formatDateTime = (date, time) => {
  return `${date} - ${formatHour(time)}`;
};

const transformData = (data) => {
  return data.map((reservation) => ({
    ...reservation,
    Reserva: formatDateTime(
      reservation.reservationDate,
      reservation.reservationTime
    ),
  }));
};

const columns = [
  "Nombre y Apellido",
  "Reserva",
  "Sucursal",
  "N° de la reserva",
];

function handleEditClick(reservation) {
  console.log("Editando reserva:", reservation);
}

function handleCancelClick(reservation) {
  console.log("Cancelando reserva:", reservation);
}

const onButtonClick = () => {};

const columnMappings = {
  "Nombre y Apellido": "apenom",
  Reserva: "Reserva",
  Sucursal: "branchName",
  "N° de la reserva": "reservation_id",
};

function Reservations() {
  const transformedData = transformData(reservationsData);

  const dropdownOptions = (reservation) => [
    {
      label: "Editar",
      action: () => handleEditClick(reservation),
      icon: <EditIcon />,
      style: {
        ":hover": { bgcolor: "secondary.dark", color: "white" },
      },
    },
    {
      label: "Cancelar",
      action: () => handleCancelClick(reservation),
      icon: <CancelIcon />,
      style: {
        ":hover": { bgcolor: "error.dark", color: "white" },
      },
    },
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ mx: 10 }}>
        <Typography
          variant="h5"
          textAlign="center"
          component="div"
          sx={{ fontWeight: "bold", padding: "1em" }}
        >
          RESERVAS
        </Typography>
        <BranchesList
          data={transformedData}
          columns={columns}
          columnMappings={columnMappings}
          buttonLabel="Opciones"
          onButtonClick={{ onButtonClick }}
          buttonIcon={<EditIcon />}
          buttonType="dropdown"
          dropdownOptions={dropdownOptions}
        />
      </Box>
    </Container>
  );
}

export default Reservations;
