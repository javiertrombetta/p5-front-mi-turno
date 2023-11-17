'use client';

import React from 'react';
import { TextField, Button, Card, MenuItem, Grid } from '@mui/material';

const times = Array.from({ length: 96 }, (_, index) => {
  const hours = String(Math.floor(index / 4)).padStart(2, '0');
  const minutes = String((index % 4) * 15).padStart(2, '0');
  return `${hours}:${minutes}`;
});

const defaultInitialData = {
  nombre: '',
  email: '',
  telefono: '',
  capacidadMaxima: '',
  horarioInicio: '',
  horarioCierre: '',
};

export default function FormBranch({ initialData = defaultInitialData }) {
  const [formData, setFormData] = React.useState(initialData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <Card sx={{ my: 4, p: 5 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField fullWidth label="Nombre" variant="outlined" name="nombre" value={formData.nombre} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Correo electrónico" variant="outlined" name="email" value={formData.email} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Teléfono" variant="outlined" name="telefono" value={formData.telefono} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Capacidad máxima" variant="outlined" name="capacidadMaxima" value={formData.capacidadMaxima} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField select fullWidth label="Horario de Inicio" variant="outlined" name="horarioInicio" value={formData.horarioInicio} onChange={handleChange}>
              {times.map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField select fullWidth label="Horario de Cierre" variant="outlined" name="horarioCierre" value={formData.horarioCierre} onChange={handleChange}>
              {times.map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth sx={{ padding: '1em' }}>
              Enviar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
}

