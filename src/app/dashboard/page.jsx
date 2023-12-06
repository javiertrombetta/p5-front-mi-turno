"use client";
import ChartLinesCard from "@/commons/ChartLinesCard";
import ChartPiesCard from "@/commons/ChartPiesCard";
import CardTotalAssists from "@/components/CardTotalAssists";
import CardTotalCancelations from "@/components/CardTotalCancelations";
import CardTotalReservation from "@/components/CardTotalReservation";
import ChartWithTitle from "@/components/ChartWithTitle";
import { getBranchesData } from "@/services/dataBranches";
import { getMetricsData } from "@/services/dataMetrics";

import { Container, Grid, MenuItem, Select, Typography } from "@mui/material";

import React, { useEffect, useState } from "react";

const page = () => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState({
    index: 0,
    id: branches.length > 0 ? branches[0]?.id : null,
  });
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    const fetchBranches = async () => {
      const branchesData = await getBranchesData();
      const sortedBranches = branchesData.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setBranches(sortedBranches || []);

      // Setear la sucursal por defecto después de cargar las sucursales
      setSelectedBranch({
        index: 0,
        id: sortedBranches.length > 0 ? sortedBranches[0]?.id : null,
      });
    };
    fetchBranches();
  }, []); // Agregamos un array vacío para que este efecto se ejecute solo una vez al montar el componente

  useEffect(() => {
    const fetchMetrics = async () => {
      const metricsData = await getMetricsData();
      // console.log("Metrics data structure:", metricsData);
      setMetrics(metricsData || []);
    };
    fetchMetrics();
  }, []);

  const handleChange = (event) => {
    const index = event.target.value;
    const id = branches[index]?.id || null;
    setSelectedBranch({ index, id });
  };

  return (
    <Container>
      <div>
        <Typography variant="h6" gutterBottom>
          Filtro de sucursales
        </Typography>
        <div>
          <Select
            label="Seleccionar sucursal"
            value={selectedBranch.index}
            onChange={handleChange}
            sx={{ minWidth: "32.5%", marginBottom: 2 }}
          >
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
          <CardTotalReservation
            metrics={metrics}
            branches={branches}
            selectedBranch={selectedBranch}
          />
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
