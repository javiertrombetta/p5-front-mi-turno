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
  getAllOpersByBusiness,
  getAllUsers,
  assignUserRole,
} from '@/services/dataUser';

import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import Loader from '@/components/Loader';

const Users = () => {
  const { user } = useSelector((state) => state.auth);
  const isUserRole = user?.role === 'user';
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    type: 'info',
    message: '',
  });

  const formatLastLogin = (lastLogin) => {
    return lastLogin ? dayjs(lastLogin).format('DD/MM/YYYY HH:ss') : 'N/A';
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      setLoading(true);
      try {
        let data;
        if (user.role === 'super') {
          data = await getAllUsers();
        } else {
          data = await getAllOpersByBusiness();
        }

        const formattedData = data.map((user) => ({
          ...user,
          lastLogin: formatLastLogin(user.lastLogin),
        }));
        setUsers(formattedData);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || 'Error al cargar las sucursales.';
        setAlertInfo({
          open: true,
          type: 'error',
          message: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    const filtered = users.filter((user) =>
      Object.values(user).some((value) => {
        const stringValue =
          value === null || value === undefined ? '' : value.toString();
        return stringValue.toLowerCase().includes(filter.toLowerCase());
      })
    );
    setFilteredUsers(filtered);
  }, [filter, users]);

  const handleCheckboxChange = (dni) => {
    setSelectedUsers((prev) =>
      prev.includes(dni) ? prev.filter((id) => id !== dni) : [...prev, dni]
    );
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleClearSelection = () => {
    setSelectedUsers([]);
  };
  const handleChangeRole = async () => {
    setAlertInfo({
      open: true,
      type: 'info',
      message: 'Cambiando rol...',
    });
    let updatedUsers = [...users];
    let errorOccurred = false;

    for (const dni of selectedUsers) {
      if (errorOccurred) break;
      try {
        await assignUserRole(dni, selectedRole);
        updatedUsers = updatedUsers.map((user) =>
          user.dni === dni ? { ...user, role: selectedRole } : user
        );
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          `Error al cambiar el rol de la sucursal con ID: ${branchId}`;
        setAlertInfo({
          open: true,
          type: 'error',
          message: `Error al cambiar el rol del usuario con DNI: ${dni}`,
        });
        errorOccurred = true;
      }
    }
    if (!errorOccurred) {
      setUsers(updatedUsers);
      setAlertInfo({
        open: true,
        type: 'success',
        message: 'Rol(es) actualizado(s) correctamente.',
      });
    }
    setSelectedUsers([]);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleRowClick = (rowData) => {
    router.push(`/users/view-user/${rowData}`);
  };

  const columns = ['DNI', 'Nombre Completo', 'Email', 'Rol', 'Ultimo Acceso'];
  const columnMappings = {
    DNI: 'dni',
    'Nombre Completo': 'fullName',
    Email: 'email',
    Rol: 'role',
    'Ultimo Acceso': 'lastLogin',
  };

  if (loading) {
    return <Loader />;
  }

  if (users.length === 0) {
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
          No se encontraron operadores.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth='xl'>
      <Box sx={{ mx: 10 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <TextField
            label='Filtrar Usuarios'
            variant='outlined'
            value={filter}
            onChange={handleFilterChange}
            sx={{ width: '50%' }}
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant='outlined' onClick={handleClearSelection}>
              Limpiar seleccionados
            </Button>
            <Select
              value={selectedRole}
              onChange={handleRoleChange}
              displayEmpty
              sx={{ minWidth: 160 }}
            >
              <MenuItem value=''>
                <em>Seleccionar Rol</em>
              </MenuItem>
              <MenuItem value='super'>Super</MenuItem>
              <MenuItem value='admin'>Admin</MenuItem>
              <MenuItem value='oper'>Oper</MenuItem>
              <MenuItem value='user'>User</MenuItem>
            </Select>
            <Button
              variant='contained'
              onClick={handleChangeRole}
              disabled={selectedUsers.length === 0 || !selectedRole}
            >
              Cambiar Rol
            </Button>
          </Box>
        </Box>
        <Lists
          data={filteredUsers}
          columns={columns}
          columnMappings={columnMappings}
          onRowClick={handleRowClick}
          selectedItems={selectedUsers}
          onCheckboxChange={handleCheckboxChange}
          showCheckboxAndControls={!isUserRole}
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

export default Users;
