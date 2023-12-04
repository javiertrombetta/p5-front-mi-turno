'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Box, CircularProgress, Typography, TextField, Button, Select, MenuItem } from '@mui/material';
import Lists from "@/commons/Lists";
import Alert from '@/commons/Alert';
import { getBranchesData, updateBranchEnableStatus, createBranch } from "@/services/dataBranches";

import { useRouter } from 'next/navigation';

const Branches = () => {
  const { user } = useSelector((state) => state.auth);
  const isAdminOrSuper = user?.role === 'admin' || user?.role === 'super';
  const router = useRouter();
  const [branches, setBranches] = useState([]);
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [enableStatus, setEnableStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    type: 'info',
    message: ''
  });

  useEffect(() => {
    if (isAdminOrSuper) {
      fetchBranches();
    } else {
      router.push('/');
    }
  }, [user, isAdminOrSuper, router]);

  const fetchBranches = async () => {
    setLoading(true);
    try {
      const data = await getBranchesData();
      setBranches(data);
      setFilteredBranches(data);
    } catch (error) {
      setAlertInfo({
        open: true,
        type: 'error',
        message: 'Error al cargar las sucursales.'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtered = branches.filter(branch =>
      Object.values(branch).some(value => {
        const stringValue = value === null || value === undefined ? '' : value.toString();
        return stringValue.toLowerCase().includes(filter.toLowerCase());
      })
    );
    setFilteredBranches(filtered);
  }, [filter, branches]);
  
  const handleCheckboxChange = (id) => {
    setSelectedBranches(prev => prev.includes(id) ? prev.filter(branchId => branchId !== id) : [...prev, id]);
  };

  const handleEnableStatusChange = (event) => {
    setEnableStatus(event.target.value);
  };

  const handleChangeEnableStatus = async () => {
    let updatedBranches = [...branches];
    let errorOccurred = false;  
    for (const branchId of selectedBranches) {
      if (errorOccurred) break;  
      try {
        await updateBranchEnableStatus(branchId, enableStatus === 'Habilitar');       
        updatedBranches = updatedBranches.map(branch => branch.id === branchId ? { ...branch, isEnable: enableStatus === 'Habilitar' } : branch);
      } catch (error) {
        console.error('Error al cambiar el estado:', error);
        setAlertInfo({
          open: true,
          type: 'error',
          message: `Error al cambiar el estado de la sucursal con ID: ${branchId}`
        });
        errorOccurred = true; 
      }
    }  
    if (!errorOccurred) {
      setBranches(updatedBranches);
      setAlertInfo({
        open: true,
        type: 'success',
        message: 'Estado(s) actualizado(s) correctamente.'
      });
    }  
    setSelectedBranches([]);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleCreateBranch = () => {
    console.log('Crear nueva sucursal');
  };

  const handleRowClick = (branchId) => {
    router.push(`/branches/manage/${branchId}`);
  };

  const columns = ["Número de sucursal", "Nombre", "Email", "Dirección", "Habilitada"];
  const columnMappings = {
    "Número de sucursal": "id",
    "Nombre": "name",
    "Email": "email",
    "Dirección": "address",
    "Habilitada": "isEnable",
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (branches.length === 0) {
    return (
      <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '15em' }}>
        <Typography variant="h6" sx={{ textAlign: 'center' }}>No se encontraron sucursales.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ mx: 10 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          {user?.role === 'super' && (
            <Button variant="contained" onClick={handleCreateBranch}>
              Crear Sucursal
            </Button>
          )}
          <TextField
            label="Filtrar Sucursales"
            variant="outlined"
            value={filter}
            onChange={handleFilterChange}
            sx={{ width: '50%' }}
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Select
              value={enableStatus}
              onChange={handleEnableStatusChange}
              displayEmpty
              sx={{ minWidth: 160 }}
            >
              <MenuItem value=""><em>Seleccionar Acción</em></MenuItem>
              <MenuItem value="Habilitar">Habilitar</MenuItem>
              <MenuItem value="Deshabilitar">Deshabilitar</MenuItem>
            </Select>
            <Button
              variant="contained"
              onClick={handleChangeEnableStatus}
              disabled={selectedBranches.length === 0 || !enableStatus}
            >
              Aplicar
            </Button>          
          </Box>
        </Box>
        <Lists
          data={filteredBranches}
          columns={columns}
          columnMappings={columnMappings}
          onRowClick={handleRowClick}
          selectedBranches={selectedBranches}
          onCheckboxChange={handleCheckboxChange}
          showCheckboxAndControls={isAdminOrSuper}          
        />
      </Box>
      <Alert
        open={alertInfo.open}
        type={alertInfo.type}
        message={alertInfo.message}
        onClose={() => setAlertInfo({ ...alertInfo, open: false })}
      />
    </Container>
  );
};

export default Branches;

