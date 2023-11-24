'use client';
import { useState } from "react";
import { Grid, Button } from "@mui/material";
import InputPassword from '@/commons/InputPassword';
import { useRouter } from 'next/navigation';
import Link from '@mui/material/Link';

const ChangePasswordForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: "" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};
    if (!formData.currentPassword.trim()) newErrors.currentPassword = "Este campo no puede estar vacío";
    if (!formData.newPassword.trim()) newErrors.newPassword = "Este campo no puede estar vacío";
    if (!formData.confirmPassword.trim()) newErrors.confirmPassword = "Este campo no puede estar vacío";

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.newPassword = "Las contraseñas no coinciden";
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Datos de cambio de contraseña:", formData);
    // Aquí puedes continuar con la lógica para cambiar la contraseña
  };  

  const handleBack = () => {
    // Navegar a la página anterior
    router.back();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <InputPassword
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            label="Contraseña actual"
            error={!!errors.currentPassword}
            helperText={errors.currentPassword}
          />
        </Grid>
        <Grid item xs={12}>
          <InputPassword
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            label="Nueva contraseña"
            error={!!errors.newPassword}
            helperText={errors.newPassword}
          />
        </Grid>
        <Grid item xs={12}>
          <InputPassword
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            label="Confirmar nueva contraseña"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ height: "3.5em", marginTop: "1em" }}
          >
            Aceptar
          </Button>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Button
            variant="text"
            color="primary"
            sx={{ height: "2em", textTransform: "none" }}
            onClick={handleBack}
          >
            Volver
          </Button>
        </Grid>        
      </Grid>
    </form>
  );
};

export default ChangePasswordForm;

