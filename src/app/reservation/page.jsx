"use client";
import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import BranchesList from "@/commons/Lists";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import { getReservationsData } from "@/services/dataReservation";

function formatDate(dateString) {
  if (!dateString) return "No informado";

  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

function Reservations() {
  const [reservationsData, setReservationsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getReservationsData();
        if (data) {
          setReservationsData(data);
          console.log(data);
        }
      } catch (error) {
        console.error("Error al obtener las reservas del cliente:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const transformedData = reservationsData.map((reservation) => ({
    id: reservation.id || "No informado",
    clientName: reservation.clientName || "No informado",
    date: formatDate(reservation.date),
    branchName: reservation.branch?.name || "No informado",
  }));

  const handleEditClick = (reservation) => {
    console.log("Editando reserva:", reservation);
  };

  const handleCancelClick = (reservation) => {
    console.log("Cancelando reserva:", reservation);
  };

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
        {loading ? (
          <p>Cargando reservas...</p>
        ) : (
          <>
            {transformedData.length > 0 ? (
              <BranchesList
                data={transformedData}
                columns={[
                  "Nombre y Apellido",
                  "Reserva",
                  "Sucursal",
                  "N° de la reserva",
                ]}
                columnMappings={{
                  "Nombre y Apellido": "clientName",
                  Reserva: "date",
                  Sucursal: "branchName",
                  "N° de la reserva": "id",
                }}
                buttonLabel="Opciones"
                buttonIcon={<EditIcon />}
                buttonType="dropdown"
                dropdownOptions={dropdownOptions}
              />
            ) : (
              <Typography variant="body1" textAlign="center">
                No tienes reservas.
              </Typography>
            )}
          </>
        )}
      </Box>
    </Container>
  );
}

export default Reservations;
