'use client';

import React from 'react';
import { useRouter } from 'next/navigation'
import { Box, Container, Typography } from '@mui/material';
import Lists from '@/commons/Lists';
import EditIcon from '@mui/icons-material/Edit';

const sucursalesData = [
  { id: 1, nombre: 'Sucursal Centro', mail: 'centro@empresa.com', capacidad: '20', horarioInicio: '8:00', horarioCierre: '20:00' },
  { id: 2, nombre: 'Sucursal Norte', mail: 'norte@empresa.com', capacidad: '15', horarioInicio: '9:00', horarioCierre: '21:00' },
  { id: 3, nombre: 'Sucursal Este', mail: 'este@empresa.com', capacidad: '10', horarioInicio: '10:00', horarioCierre: '22:00' },
  { id: 4, nombre: 'Sucursal Oeste', mail: 'oeste@empresa.com', capacidad: '18', horarioInicio: '9:00', horarioCierre: '19:00' },
  { id: 5, nombre: 'Sucursal Sur', mail: 'sur@empresa.com', capacidad: '25', horarioInicio: '8:30', horarioCierre: '20:30' },
  { id: 6, nombre: 'Sucursal Franco', mail: 'franco@empresa.com', capacidad: '8', horarioInicio: '9:00', horarioCierre: '18:00' },
  { id: 7, nombre: 'Sucursal Darío', mail: 'dario@empresa.com', capacidad: '12', horarioInicio: '10:00', horarioCierre: '21:00' }
];

const formatHour = (hour) => {  
  const [hrs, mins] = hour.split(':');  
  return `${hrs.length === 1 ? '0' + hrs : hrs}:${mins}`;
};

const transformData = (data) => {
  return data.map(sucursal => ({
    ...sucursal,
    'workingHours': `${formatHour(sucursal.horarioInicio)} - ${formatHour(sucursal.horarioCierre)}`
  }));
};

const columns = ['Nombre', 'Mail', 'Capacidad máxima', 'Horarios'];

const columnMappings = {
  'Nombre': 'nombre',
  'Mail': 'mail',
  'Capacidad máxima': 'capacidad',
  'Horarios': 'workingHours'
};

function Branches() {
  const router = useRouter();
  const transformedData = transformData(sucursalesData);
  
  const handleEditBranch = (sucursal) => {
    if (sucursal && sucursal.id) {
      router.push(`/companies/branches/edit`);
    } else {
      console.error('Sucursal no definida');
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mx: 10 }}>
        <Typography variant="h5" textAlign="center" component="div" sx={{ fontWeight: 'bold', padding: '1em' }}>
          SUCURSALES
        </Typography>
        <Lists data={transformedData} columns={columns} columnMappings={columnMappings} buttonLabel="Editar" onButtonClick={handleEditBranch} buttonIcon={<EditIcon />}  
        />
      </Box>
    </Container>
  );
}

export default Branches;

