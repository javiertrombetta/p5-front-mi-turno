'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
} from '@mui/material';
import Lists from '@/commons/Lists';
import Alert from '@/commons/Alert';
import {
  getBranchesData,
  updateBranchEnableStatus,
  createBranch,
} from '@/services/dataBranches';

import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';

const Branches = () => {
  const { user } = useSelector((state) => state.auth);
  const isAdminOrSuper = user?.role === 'admin' || user?.role === 'super';
  const router = useRouter();
  const [branches, setBranches] = useState([]);
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [enableStatus, setEnableStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    type: 'info',
    message: '',
  });

  useEffect(() => {
    if (isAdminOrSuper) {
      fetchBranches();
    }
  }, [isAdminOrSuper]);

  const fetchBranches = async () => {
    setLoading(true);
    try {
      const data = await getBranchesData();
      const formattedData = data
        .map((branch) => ({
          ...branch,
          isEnableFormatted: branch.isEnable ? 'Sí' : 'No',
        }))
        .sort((a, b) => a.id - b.id);
      setBranches(formattedData);
      setFilteredBranches(formattedData);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Error al cargar las sucursales.';
      setAlertInfo({ open: true, type: 'error', message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtered = branches.filter((branch) =>
      Object.values(branch).some((value) => {
        const stringValue =
          value === null || value === undefined ? '' : value.toString();
        return stringValue.toLowerCase().includes(filter.toLowerCase());
      })
    );
    setFilteredBranches(filtered);
  }, [filter, branches]);

  const handleCheckboxChange = (branchId) => {
    setSelectedBranches((prev) =>
      prev.includes(branchId)
        ? prev.filter((id) => id !== branchId)
        : [...prev, branchId]
    );
  };

  const handleEnableStatusChange = (event) => {
    setEnableStatus(event.target.value);
  };

  const handleChangeEnableStatus = async () => {
    setAlertInfo({
      open: true,
      type: 'info',
      message: 'Cambiando estado...',
    });
    let updatedBranches = [...branches];
    let errorOccurred = false;

    for (const branchId of selectedBranches) {
      if (errorOccurred) break;
      try {
        const isBranchEnabled = enableStatus === 'Habilitar';
        await updateBranchEnableStatus(branchId, isBranchEnabled);
        updatedBranches = updatedBranches.map((branch) =>
          branch.id === branchId
            ? { ...branch, isEnable: isBranchEnabled ? 'Sí' : 'No' }
            : branch
        );
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          `Error al cambiar el estado de la sucursal con ID: ${branchId}`;
        setAlertInfo({ open: true, type: 'error', message: errorMessage });
        errorOccurred = true;
      }
    }

    if (!errorOccurred) {
      setBranches(updatedBranches);
      setFilteredBranches(updatedBranches);
      setFilteredBranches([]);
      fetchBranches();
      setAlertInfo({
        open: true,
        type: 'success',
        message: 'Estado(s) actualizado(s) correctamente.',
      });
    }

    setSelectedBranches([]);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleCreateBranch = () => {
    router.push('/branches/manage');
  };

  const handleRowClick = (branchId) => {
    router.push(`/branches/manage/${branchId}`);
  };

  const columns = ['Sucursal', 'Email', 'Teléfono', '¿Sucursal activa?'];
  const columnMappings = {
    Sucursal: 'name',
    Email: 'email',
    Teléfono: 'phoneNumber',
    '¿Sucursal activa?': 'isEnableFormatted',
  };

  if (loading) {
    return <Loader />;
  }

  if (branches.length === 0) {
    return (
      <Container
        maxWidth='xl'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '15em',
        }}
      >
        <Typography variant='h6' sx={{ textAlign: 'center' }}>
          No se encontraron sucursales.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth='xl'>
      <Box sx={{ mx: 10 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          {user?.role === 'super' && (
            <Button variant='contained' onClick={handleCreateBranch}>
              Crear Sucursal
            </Button>
          )}
          <TextField
            label='Filtrar Sucursales'
            variant='outlined'
            value={filter}
            onChange={handleFilterChange}
            sx={{ width: '50%' }}
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Select
              value={enableStatus}
              onChange={handleEnableStatusChange}
              displayEmpty
              sx={{ minWidth: 180 }}
            >
              <MenuItem value=''>
                <em>Seleccionar Acción</em>
              </MenuItem>
              <MenuItem value='Habilitar'>Habilitar</MenuItem>
              <MenuItem value='Deshabilitar'>Deshabilitar</MenuItem>
            </Select>
            <Button
              variant='contained'
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
          selectedItems={selectedBranches}
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
