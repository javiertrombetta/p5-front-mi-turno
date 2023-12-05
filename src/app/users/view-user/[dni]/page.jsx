'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from "react-redux";
import { getUserInfoById, updateUserInfoByDni } from '@/services/dataUser';
import { Typography, Container, CircularProgress, Box, Button, Avatar, Select, MenuItem } from '@mui/material';
import InputText from '@/commons/InputText';
import { useRouter } from 'next/navigation';
import Alert from "@/commons/Alert";
import dayjs from 'dayjs';

const ViewUser = ({ params }) => {
  const { user } = useSelector((state) => state.auth);
  const isSuperUser = user?.role === 'super';
  const [showChangeLabel, setShowChangeLabel] = useState(false);
  const [userRow, setUserRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef();
  const router = useRouter();

  const [alertInfo, setAlertInfo] = useState({
    open: false,
    type: 'info',
    message: ''
  });
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUserInfoById(params.dni);
        setUserRow({ ...fetchedUser, role: fetchedUser.role || 'user' });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUser();
  }, [params.dni]);

  const formatLastAccess = (lastLogin) => {
    return lastLogin ? dayjs(lastLogin).format('DD/MM/YYYY HH:mm') : 'No tiene accesos al sistema';
  };

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('');
  const avatarUrl = userRow?.photo || `https://via.placeholder.com/300?text=${getInitials(userRow?.fullName || '')}`;

  const handleBackToList = () => {
    router.push('/users');
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserRow(prevUserRow => ({
      ...prevUserRow,
      [name]: value
    }));
  };
  
  const handleUploadPhoto = async () => {
    if (!selectedFile) {
      setAlertInfo({ open: true, type: 'error', message: 'Por favor, selecciona una foto primero.' });
      return;
    }  
    const formData = new FormData();
    formData.append('photo', selectedFile);  
    try {
      const updatedUser = await updateUserInfoByDni(formData);
      setUserRow(updatedUser); 
      setAlertInfo({ open: true, type: 'success', message: 'Foto actualizada correctamente.' });
    } catch (error) {
      setAlertInfo({ open: true, type: 'error', message: 'Error al actualizar la foto.' });
    }
  };

  const handleDeleteUser = async () => {
    const confirm = window.confirm('¿Estás seguro de que quieres eliminar este usuario?');
    if (confirm) {
      try {
        await deleteUserById(userRow.dni);
        setAlertInfo({ open: true, type: 'success', message: 'Usuario eliminado con éxito.' });
        router.push('/users');
      } catch (error) {
        setAlertInfo({ open: true, type: 'error', message: 'Error al eliminar el usuario.' });
      }
    }
  };

  const handleAcceptChanges = async () => {
    try {
      if (!userRow.dni) {
        throw new Error("DNI no está definido");
      }  
      const updatedUser = await updateUserInfoByDni({ ...userRow });  
      setUserRow(updatedUser);
      setAlertInfo({ open: true, type: 'success', message: 'Información actualizada con éxito.' });
    } catch (error) {
      console.error('Error al actualizar la información del usuario:', error);
      setAlertInfo({ open: true, type: 'error', message: 'Error al actualizar la información.' });
    }
  };
  

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!userRow) {
    return <Typography>No se encontró el usuario.</Typography>;
  }

  return (
    <Container sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 10 }}>Detalles del Usuario</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box sx={{ flexGrow: 1, pr: 3 }}>
                <InputText
                    label="DNI"
                    value={userRow.dni}
                    disabled={true}
                    onChange={handleInputChange}
                    name="dni"
                />
                <InputText
                    label="Nombre Completo"
                    value={userRow.fullName}
                    disabled={!isSuperUser}
                    onChange={handleInputChange}
                    name="fullName"
                />
                <InputText
                    label="Email"
                    value={userRow.email}
                    disabled={!isSuperUser}
                    onChange={handleInputChange}
                    name="email"
                />
                <InputText
                    label="Teléfono"
                    value={userRow.phoneNumber}
                    disabled={!isSuperUser}
                    onChange={handleInputChange}
                    name="phoneNumber"
                />
            </Box>
            <Box
                sx={{ position: 'relative', width: 300, height: 300, '&:hover': { cursor: 'pointer' } }}
                onMouseOver={() => setShowChangeLabel(true)}
                onMouseOut={() => setShowChangeLabel(false)}
                onClick={() => fileInputRef.current.click()}
            >
                <Avatar src={avatarUrl} sx={{ width: 300, height: 300 }} />
                {showChangeLabel && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            opacity: showChangeLabel ? 1 : 0,
                            transition: 'opacity 1s ease',
                        }}
                        onClick={handleUploadPhoto}
                    >
                        Cambiar foto
                    </Box>
                )}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                />
            </Box>
        </Box>
        <Box>
            {isSuperUser ? (
                <Select
                    label="Rol"
                    value={userRow.role}
                    onChange={e => setUserRow({ ...userRow, role: e.target.value })}
                    name="role"
                >
                    <MenuItem value="super">Superadministrador</MenuItem>
                    <MenuItem value="admin">Administrador</MenuItem>
                    <MenuItem value="oper">Operador</MenuItem>
                    <MenuItem value="user">Usuario</MenuItem>
                </Select>
            ) : (
                <InputText label="Rol" value={userRow.role} disabled />
            )}
            <InputText label="Último Acceso" value={formatLastAccess(userRow.lastLogin)} disabled />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 4 }}>
            <Button variant="outlined" color="primary" onClick={handleBackToList} sx={{ px: 3, py: 1.5, fontSize: '1rem' }}>Volver al Listado</Button>
            <Button variant="contained" color="error" onClick={handleDeleteUser} sx={{ ml: 2, px: 3, py: 1.5, fontSize: '1rem' }}>Eliminar</Button>
            {isSuperUser && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAcceptChanges}
                    sx={{ ml: 2, px: 3, py: 1.5, fontSize: '1rem' }}
                >
                    Aceptar Cambios
                </Button>
            )}
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

export default ViewUser;

