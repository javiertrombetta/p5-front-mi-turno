"use client";
import { useSelector } from 'react-redux';
import ChartLinesCard from "@/commons/ChartLinesCard";
import ChartPiesCard from "@/commons/ChartPiesCard";
import CardTotalAssists from "@/components/CardTotalAssists";
import CardAverageCancelations from "@/components/CardAverageCancelations";
import CardTotalReservation from "@/components/CardTotalReservation";
import ChartWithTitle from "@/components/ChartWithTitle";
import { getBranchesData } from "@/services/dataBranches";
import { getMetricsData } from "@/services/dataMetrics";

import { Container, Grid, MenuItem, Select, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const userRole = useSelector(state => state.auth.user.role);
  const [branches, setBranches] = useState([]);
  const [selectedBranchIndex, setSelectedBranchIndex] = useState(0);
  const [metrics, setMetrics] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const branchesData = await getBranchesData();
        setBranches(branchesData.sort((a, b) => a.name.localeCompare(b.name)));
      } catch (error) {
        setError('Error al obtener las sucursales: ' + error.message);
      }
    };
    fetchBranches();
  }, []);

  useEffect(() => {
    if (branches.length > 0) {
      const fetchMetrics = async () => {
        try {
          const branchId = branches[selectedBranchIndex]?.id;
          if (branchId) {
            const metricsData = await getMetricsData(branchId);
            setMetrics(metricsData || {});
          }
        } catch (error) {
          setError('Error al obtener métricas: ' + error.message);
        }
      };
      fetchMetrics();
    }
  }, [branches, selectedBranchIndex]);

  const handleChange = (event) => {
    setSelectedBranchIndex(event.target.value);
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container>
      {userRole === "super" || userRole === "admin" ? (
        <>
          <Typography variant="h6" gutterBottom>
            Filtro de sucursales
          </Typography>
          <Select
            label="Seleccionar sucursal"
            value={selectedBranchIndex}
            onChange={handleChange}
            sx={{ minWidth: "32.5%", marginBottom: 2 }}
          >
            {branches.map((branch, index) => (
              <MenuItem key={branch.id} value={index}>
                {branch.name}
              </MenuItem>
            ))}
          </Select>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <CardTotalReservation
                metrics={metrics}
                selectedBranchId={branches[selectedBranchIndex]?.id}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CardTotalAssists
                metrics={metrics}
                selectedBranchId={branches[selectedBranchIndex]?.id}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CardAverageCancelations
                metrics={metrics}
                selectedBranchId={branches[selectedBranchIndex]?.id}
              />
            </Grid>            
            <Grid item xs={12} sm={4}>
              <ChartPiesCard 
              metrics={metrics}
              selectedBranchId={branches[selectedBranchIndex]?.id} 
            />              
            </Grid>
            <Grid item xs={12} sm={8}>
              <ChartLinesCard
                metrics={metrics}
                selectedBranchId={branches[selectedBranchIndex]?.id}
              />
            </Grid>
            <Grid item xs={12}>
              <ChartWithTitle metrics={metrics} />
            </Grid>
          </Grid>
        </>
      ) : (
        <Typography variant="h6" gutterBottom>
          Acceso restringido
        </Typography>
      )}
    </Container>
  );
};

export default Dashboard;