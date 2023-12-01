"use client";

import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import Lists from "@/commons/Lists";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import Alert from '@/commons/Alert';
import { getReservationsData } from "@/services/dataReservation";
import dayjs from 'dayjs';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    type: 'info',
    message: ''
  });

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getReservationsData();
        const formattedData = data.map(item => ({
          ...item,
          date: dayjs(item.date).format("DD/MM/YYYY") + " " + item.time.substring(0, 5),
          branchName: item.branch.name,
        }));
        setReservations(formattedData);       
      } catch (error) {
        setAlertInfo({
          open: true,
          type: 'error',
          message: 'Error al cargar las reservas.'
        });
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  const handleCloseAlert = () => {
    setAlertInfo({ ...alertInfo, open: false });
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (reservations.length === 0) {
    return <Typography>No se encontraron reservas.</Typography>;
  }



  const columns = ["Nombre y Apellido", "Reserva", "Sucursal", "N° de la reserva"];
  const columnMappings = {
    "Nombre y Apellido": "clientName",
    Reserva: "date",
    Sucursal: "branchName",
    "N° de la reserva": "id",
  };

  const dropdownOptions = (reservation) => [
    {
      label: "Editar",
      action: () => console.log("Editando reserva:", reservation),
      icon: <EditIcon />,
      style: {
        ":hover": { bgcolor: "secondary.dark", color: "white" },
      },
    },
    {
      label: "Cancelar",
      action: () => console.log("Cancelando reserva:", reservation),
      icon: <CancelIcon />,
      style: {
        ":hover": { bgcolor: "error.dark", color: "white" },
      },
    },
  ];

  const onButtonClick = (data) => {
    console.log("Button clicked with data:", data);
  };

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
        <Lists
          data={reservations}
          columns={columns}
          columnMappings={columnMappings}
          buttonLabel="Opciones"
          onButtonClick={onButtonClick}
          buttonIcon={<EditIcon />}
          buttonType="dropdown"
          dropdownOptions={dropdownOptions}
        />
      </Box>
      <Alert
        open={alertInfo.open}
        type={alertInfo.type}
        message={alertInfo.message}
        onClose={handleCloseAlert}
      />
    </Container>
  );
};

export default Reservations;
