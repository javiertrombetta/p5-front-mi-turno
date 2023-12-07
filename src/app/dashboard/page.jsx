'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Button,
  MenuItem,
  Select,
  Typography,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ChartLinesCard from '@/commons/ChartLinesCard';
import ChartPiesCardFinished from '@/commons/ChartPiesCardFinished';
import ChartPiesCardPending from '@/commons/ChartPiesCardPending';
import CardTotalAssists from '@/components/CardTotalAssists';
import CardTotalReservation from '@/components/CardTotalReservation';
import CardPeakTimes from '@/components/CardPeakTimes';
import { getBranchesData } from '@/services/dataBranches';
import { getMetricsData } from '@/services/dataMetrics';

const Dashboard = () => {
  const userRole = useSelector((state) => state.auth.user?.role);
  const [branches, setBranches] = useState([]);
  const [selectedBranchIndex, setSelectedBranchIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
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
            const metricsData = await getMetricsData(branchId, selectedDate);
            setMetrics(metricsData || {});
          }
        } catch (error) {
          setError('Error al obtener métricas: ' + error.message);
        }
      };
      fetchMetrics();
    }
  }, [branches, selectedBranchIndex, selectedDate]);

  const handleBranchChange = (event) => {
    setSelectedBranchIndex(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const clearDateSelection = () => {
    setSelectedDate(null);
  };

  if (error) {
    return <Typography color='error'>{error}</Typography>;
  }

  return (
    <Container>
      {userRole === 'super' || userRole === 'admin' ? (
        <>
          <Typography variant='h6' gutterBottom>
            Filtro de reservas por sucursales y fechas
          </Typography>
          <Select
            label='Seleccionar sucursal'
            value={selectedBranchIndex}
            onChange={handleBranchChange}
            sx={{ minWidth: '32.5%', marginBottom: 5 }}
          >
            {branches.map((branch, index) => (
              <MenuItem key={branch.id} value={index}>
                {branch.name}
              </MenuItem>
            ))}
          </Select>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label='Seleccionar fecha'
              value={selectedDate}
              onChange={handleDateChange}
              format='dd/MM/yyyy'
            >
              {(params) => <TextField {...params} readOnly />}
            </DatePicker>
          </LocalizationProvider>
          <Button
            variant='outlined'
            onClick={clearDateSelection}
            sx={{ ml: 1, mb: 0.2, py: 1.8 }}
          >
            Limpiar Fecha
          </Button>
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
              <CardPeakTimes
                metrics={metrics}
                selectedBranchId={branches[selectedBranchIndex]?.id}
                selectedDate={selectedDate} // agregado x fran
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ChartPiesCardFinished
                metrics={metrics}
                selectedBranchId={branches[selectedBranchIndex]?.id}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ChartPiesCardPending
                metrics={metrics}
                selectedBranchId={branches[selectedBranchIndex]?.id}
              />
            </Grid>
            <Grid item xs={12}>
              <ChartLinesCard
                metrics={metrics}
                selectedBranchId={branches[selectedBranchIndex]?.id}
              />
            </Grid>
          </Grid>
        </>
      ) : (
        <Typography variant='h6' gutterBottom>
          Acceso restringido
        </Typography>
      )}
    </Container>
  );
};

export default Dashboard;
