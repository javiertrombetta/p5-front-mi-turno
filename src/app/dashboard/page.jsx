"use client";
import ChartLinesCard from "@/commons/ChartLinesCard";
import ChartPiesCard from "@/commons/ChartPiesCard";
import CardTotalAssists from "@/components/CardTotalAssists";
import CardTotalCancelations from "@/components/CardTotalCancelations";
import CardTotalReservation from "@/components/CardTotalReservation";
import ChartWithTitle from "@/components/ChartWithTitle";
import { getBranchesData } from "@/services/dataBranches";
import { Container, Grid, MenuItem, Select, Typography } from "@mui/material";

import React, { useEffect, useState } from "react";

const page = () => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(-1);

  useEffect(() => {
    const fetchBranches = async () => {
      const branchesData = await getBranchesData();
      setBranches(branchesData || []);
    };
    fetchBranches();
  }, []);

  const handleChange = (event) => {
    setSelectedBranch(event.target.value);
  };
  console.log(branches);

  return (
    <Container>
      <div>
        <Typography variant="h6" gutterBottom>
          Filtro de sucursales
        </Typography>
        <div>
          <Select
            label="Seleccionar sucursal"
            value={selectedBranch}
            onChange={handleChange}
            sx={{ minWidth: "32.5%", marginBottom: 2 }}
          >
            <MenuItem value={-1}>--Elige sucursal--</MenuItem>
            {branches.map((branch, index) => (
              <MenuItem key={index} value={index}>
                {branch.name}
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
