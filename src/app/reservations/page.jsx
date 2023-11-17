'use client';

import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import BranchesList from '@/commons/Lists';
import EditIcon from '@mui/icons-material/Edit'
import CancelIcon from '@mui/icons-material/Cancel';

const reservationsData = [
  { id: 1, apenom: 'Facundo Velasco', reservationDate: '15/12/2023', reservationTime: '09:30', branchName: 'Sucursal Norte', reservation_id: '1141472791015' },
  { id: 2, apenom: 'Laura Martínez', reservationDate: '16/12/2023', reservationTime: '10:00', branchName: 'Sucursal Centro', reservation_id: '2141472791025' },
  { id: 3, apenom: 'Miguel Ángel', reservationDate: '17/12/2023', reservationTime: '11:30', branchName: 'Sucursal Este', reservation_id: '3141472791035' },
  { id: 4, apenom: 'Sofía Castro', reservationDate: '18/12/2023', reservationTime: '12:00', branchName: 'Sucursal Oeste', reservation_id: '4141472791045' },
  { id: 5, apenom: 'Carlos Pérez', reservationDate: '19/12/2023', reservationTime: '13:30', branchName: 'Sucursal Sur', reservation_id: '5141472791055' },
  { id: 6, apenom: 'Lucía Gómez', reservationDate: '20/12/2023', reservationTime: '14:00', branchName: 'Sucursal Franco', reservation_id: '6141472791065' },
  { id: 7, apenom: 'Esteban Quito', reservationDate: '21/12/2023', reservationTime: '15:30', branchName: 'Sucursal Darío', reservation_id: '7141472791075' },
  { id: 8, apenom: 'Ana María', reservationDate: '22/12/2023', reservationTime: '16:00', branchName: 'Sucursal Este', reservation_id: '8141472791085' },
  { id: 9, apenom: 'Juan Domínguez', reservationDate: '23/12/2023', reservationTime: '17:30', branchName: 'Sucursal Oeste', reservation_id: '9141472791095' },
  { id: 10, apenom: 'María Fernanda', reservationDate: '24/12/2023', reservationTime: '18:00', branchName: 'Sucursal Centro', reservation_id: '10141472791005' }
];

const formatHour = (hour) => {  
  const [hrs, mins] = hour.split(':');  
  return `${hrs.length === 1 ? '0' + hrs : hrs}:${mins}`;
};

const formatDateTime = (date, time) => {
  return `${date} - ${formatHour(time)}`;
};

const transformData = (data) => {
  return data.map(reservation => ({
    ...reservation,
    'Reserva': formatDateTime(reservation.reservationDate, reservation.reservationTime),
  }));
};

const columns = ['Nombre y Apellido', 'Reserva', 'Sucursal', 'N° de la reserva'];

function handleEditClick(reservation) {  
  console.log('Editando reserva:', reservation);
}

function handleCancelClick(reservation) {  
  console.log('Cancelando reserva:', reservation);
}


 const onButtonClick = () => {};

const columnMappings = {
  'Nombre y Apellido': 'apenom',
  'Reserva': 'Reserva',
  'Sucursal': 'branchName',
  'N° de la reserva': 'reservation_id'
};

function Reservations() {
  const transformedData = transformData(reservationsData);

  const dropdownOptions = (reservation) => [
    { 
      label: "Editar", 
      action: () => handleEditClick(reservation),      
      icon: <EditIcon />,
      style: {
        ':hover': { bgcolor: 'secondary.dark', color: 'white' }
      }
    },
    { 
      label: "Cancelar", 
      action: () => handleCancelClick(reservation),
      icon: <CancelIcon />,
      style: {   
        ':hover': { bgcolor: 'error.dark', color: 'white' }
      }
    }    
  ];
  
  return (
    <Container maxWidth="xl">
      <Box sx={{ mx: 10 }}>
        <Typography variant="h5" textAlign="center" component="div" sx={{ fontWeight: 'bold', padding: '1em', }}>
          RESERVAS
        </Typography>
        <BranchesList 
          data={transformedData}
          columns={columns}
          columnMappings={columnMappings}
          buttonLabel="Opciones"
          onButtonClick={{onButtonClick}}
          buttonIcon={<EditIcon />} 
          buttonType="dropdown"
          dropdownOptions={dropdownOptions}
        />
      </Box>
    </Container>
  );
}

export default Reservations;