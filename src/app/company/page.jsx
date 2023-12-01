'use client';

import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Lists from '@/commons/Lists';
import EditIcon from '@mui/icons-material/Edit';

const companiesData = [
  { id: 1, name: 'Franquitos Market', mail: 'casacentral@franquitos.com', phone: '08006978963', startTime: '8:00', closeTime: '20:00' },
  { id: 2, name: 'Belén Biomarket', mail: 'contacto@belenbiomarket.com', phone: '08001234567', startTime: '9:00', closeTime: '18:00' },
  { id: 3, name: 'Valentín Ventures', mail: 'info@valentinventures.com', phone: '08009876543', startTime: '8:30', closeTime: '19:30' },
  { id: 4, name: 'Darío Designs', mail: 'support@dariodesigns.com', phone: '08006543210', startTime: '10:00', closeTime: '22:00' },
  { id: 5, name: 'Velasco Travels', mail: 'booking@velascotravels.com', phone: '08001231234', startTime: '7:00', closeTime: '21:00' }
];

const formatHour = (hour) => {  
  const [hrs, mins] = hour.split(':');  
  return `${hrs.length === 1 ? '0' + hrs : hrs}:${mins}`;
};

const transformData = (data) => {
  return data.map(company => ({
    ...company,
    'workingHours': `${formatHour(company.startTime)} - ${formatHour(company.closeTime)}`
  }));
};

const columns = ['Nombre', 'Mail', 'Teléfono', 'Horarios'];

function handleButtonClick(company) {  
  console.log('Editando empresa:', company);
}

const columnMappings = {
  'Nombre': 'name',
  'Mail': 'mail',
  'Teléfono': 'phone',
  'Horarios': 'workingHours'
};

function Companies() {
  const transformedData = transformData(companiesData);
  
  return (
    <Container maxWidth="xl">
      <Box sx={{ mx: 10 }}>
        <Typography variant="h5" textAlign="center" component="div" sx={{ fontWeight: 'bold', padding: '1em' }}>
          EMPRESAS
        </Typography>
        <Lists 
          data={transformedData}
          columns={columns}
          columnMappings={columnMappings}
          buttonLabel="Editar"
          onButtonClick={handleButtonClick}
          buttonIcon={<EditIcon />}
        />
      </Box>
    </Container>
  );
}

export default Companies;