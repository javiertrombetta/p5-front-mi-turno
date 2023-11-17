'use client';

import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Lists from '@/commons/Lists';
import EditIcon from '@mui/icons-material/Edit';

const usersData = [
  { id: 1, fullname: 'Facundo Velasco', mail: 'facundo@velasco.com', phone: '1159876325', role: 'Usuario', company: '', branch: '', password: 'password1', lastAccess: '2023-03-10 08:45'},
  { id: 2, fullname: 'Rodrigo Escalera', mail: 'rodrigo@stairs.com', phone: '1159876326', role: 'Administrador', company: 'Velasco Travels', branch: 'Sucursal Centro', password: 'password2', lastAccess: '2023-03-11 09:30'},
  { id: 3, fullname: 'Juan Manuel Tierno', mail: 'juanmanuel@soft.com', phone: '1159876327', role: 'Operario', company: 'Velasco Travels', branch: 'Sucursal Norte', password: 'password3', lastAccess: '2023-03-12 10:15'},
  { id: 4, fullname: 'Francisco Mackkinon', mail: 'francisco@maquinon.com', phone: '1159876328', role: 'Usuario', company: '', branch: '', password: 'password4', lastAccess: '2023-03-13 11:00'},
  { id: 5, fullname: 'Gisela Arroyo', mail: 'gisela@arroyo.com', phone: '1159876329', role: 'Usuario', company: '', branch: '', password: 'password5', lastAccess: '2023-03-14 11:45'},
  { id: 6, fullname: 'Darío Andrada', mail: 'dario@andrada.com', phone: '1159876330', role: 'Administrador', company: 'Franquitos Market', branch: 'Sucursal Franco', password: 'password6', lastAccess: '2023-03-15 12:30'},
  { id: 7, fullname: 'Valentín Guardia', mail: 'valentin@guardia.com', phone: '1159876331', role: 'Operario', company: 'Franquitos Market', branch: 'Sucursal Franco', password: 'password7', lastAccess: '2023-03-16 13:15'},
  { id: 8, fullname: 'Belén Banegas', mail: 'belen@banegas.com', phone: '1159876332', role: 'Operario', company: 'Darío Designs', branch: 'Sucursal Darío', password: 'password8', lastAccess: '2023-03-17 14:00'},
  { id: 9, fullname: 'Julieta Prandi', mail: 'julieta@prandi.com', phone: '1159876333', role: 'Usuario', company: '', branch: '', password: 'password9', lastAccess: '2023-03-18 14:45'},
  { id: 10, fullname: 'Javier Trombetta', mail: 'javier@trombetta.com', phone: '1159876334', role: 'Administrador', company: 'Darío Designs', branch: 'Sucursal Darío', password: 'password10', lastAccess: '2023-03-19 15:30'},
  { id: 11, fullname: 'Santiago Scanlan', mail: 'santiago@scanlan.com', phone: '1166588632', role: 'Super', company: '', branch: '', password: 'password11', lastAccess: '2023-03-20 16:15'}
];


const columns = ['Nombre', 'Mail', 'Empresa', 'Sucursal'];

function handleEditClick(user) {  
  console.log('Editando usuario:', user);
}

const columnMappings = {
  'Nombre': 'fullname',
  'Mail': 'mail',
  'Empresa': 'company',
  'Sucursal': 'branch'
};

function Operators() {
  // Filtrar para mostrar solo usuarios con el rol "Operario"
  const filteredUsersData = usersData.filter(user => user.role === 'Operario');

  return (
    <Container maxWidth="xl">
      <Box sx={{ mx: 10 }}>
        <Typography variant="h5" textAlign="center" component="div" sx={{ fontWeight: 'bold', padding: '1em' }}>
          OPERADORES
        </Typography>
        <Lists 
          data={filteredUsersData}
          columns={columns}
          columnMappings={columnMappings}
          buttonLabel="Editar"
          onButtonClick={handleEditClick}
          buttonIcon={<EditIcon />}
        />
      </Box>
    </Container>
  );
}

export default Operators;