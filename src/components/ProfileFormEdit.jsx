'use client';

// ProfileFormEdit.jsx
import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import InputText from '@/commons/InputText';
import InputEmail from '@/commons/InputEmail';

const ProfileFormEdit = ({ user, onUserUpdate }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({ ...user });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onUserUpdate(formData);
    console.log("Datos enviados:", formData);
  };

  const handleChangePassword = () => {
    router.push('/user/profile/changePassword');
  };

  return (
    <Card sx={{ maxWidth: { xs: '100%', sm: '75%', md: '60%' }, margin: "auto", marginTop: "3em", padding: "2em"}}>
      <CardContent sx={{width:"30em"}}>
        <Typography variant="h5" marginBottom="1em" gutterBottom>
          Editar Perfil
        </Typography>
        <form onSubmit={handleSubmit} >
          <Stack spacing={5}>
            <InputText
              label="Nombre y Apellido"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <InputText
              label="DNI"
              name="dni"
              value={formData.dni}
              disabled={true}
            />
            <InputEmail
              label="Email"
              name="email"
              value={formData.email}
              disabled={true}
            />
            <InputText
              label="Teléfono"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="tel"
            />
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2} justifyContent="space-between" mt={5}>
            <Button variant="contained" color="secondary" onClick={handleChangePassword} sx={{ width: { md: '48%' }, fontSize: "0.8em", paddingY: "1em" }}>
              Cambiar contraseña
            </Button>
            <Button variant="contained" color="primary" type="submit" sx={{ width: { md: '48%' }, fontSize: "0.8em" }}>
              Confirmar
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileFormEdit;
