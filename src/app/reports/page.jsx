"use client";
import ChartLinesCard from "@/commons/ChartLinesCard";
import ChartPiesCard from "@/commons/ChartPiesCard";
import CardTotalAssists from "@/components/CardTotalAssists";
import CardTotalCancelations from "@/components/CardTotalCancelations";
import CardTotalReservation from "@/components/CardTotalReservation";
import ChartWithTitle from "@/components/ChartWithTitle";

import BasicSelect from "@/components/SelectForm";
import { Container, Grid, MenuItem, Select, Typography } from "@mui/material";

import React from "react";

const page = () => {
  const sucursales = [
    { sucursal: "Ciudad 1" },
    { sucursal: "Ciudad 2" },
    { sucursal: "Ciudad 3" },
  ];

  return (
    <Container>
      <div>
        <Typography variant="h6" gutterBottom>
          Filtro de sucursales
        </Typography>
        <div>
          <Select
            label="Seleccionar sucursal"
            sx={{ minWidth: "32.5%", marginBottom: 2 }}
          >
            {/* Agrega un MenuItem para el valor por defecto */}
            <MenuItem value={-1}>--Elige sucursal--</MenuItem>
            {/* Mapear las sucursales dentro del componente Select */}
            {sucursales.map((sucursal, index) => (
              <MenuItem key={index} value={index}>
                {sucursal.sucursal}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <CardTotalReservation />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CardTotalCancelations />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CardTotalAssists />
        </Grid>

        <Grid item xs={12} sm={4}>
          <ChartPiesCard />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <ChartLinesCard />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <ChartWithTitle />
        </Grid>
      </Grid>
    </Container>
  );
};

export default page;
/* 








*/
