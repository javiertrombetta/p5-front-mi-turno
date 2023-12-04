"use client";
import { useState } from "react";
import { Grid, Button } from "@mui/material";
import InputPassword from "@/commons/InputPassword";
import { useRouter } from "next/navigation";
import { changeUserPassword } from "@/services/dataUser";
import Alert from "@/commons/Alert";
import { logoutSuccess } from "@/hooks/slices/authSlice";
import { useDispatch } from "react-redux";

const ChangePasswordForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({
    open: false,
    type: "info",
    message: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: "" });
  };

  const handleLogoutAndRedirect = () => {
    setTimeout(() => {
      dispatch(logoutSuccess());
      router.push("/");
     }, 2000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};
    if (!formData.currentPassword.trim())
      newErrors.currentPassword = "Este campo no puede estar vacío";
    if (!formData.newPassword.trim())
      newErrors.newPassword = "Este campo no puede estar vacío";
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setAlert({
        open: true,
        type: "info",
        message: "Cambiando contraseña...",
      });
      const response = await changeUserPassword(
        formData.currentPassword,
        formData.newPassword
      );
      setAlert({
        open: true,
        type: "success",
        message: response.message,
      });
      handleLogoutAndRedirect();
    } catch (error) {
      setAlert({
        open: true,
        type: "error",
        message:
          error.response?.data?.message || "Error al cambiar la contraseña",
      });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
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
            sx={{ height: "4em", marginTop: "1em" }}
          >
            Aceptar
          </Button>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Button
            variant="text"
            color="primary"
            sx={{ height: "1rem", textTransform: "none" }}
            onClick={handleBack}
          >
            Volver
          </Button>
        </Grid>
      </Grid>
      <Alert
        open={alert.open}
        type={alert.type}
        message={alert.message}
        onClose={handleCloseAlert}
      />
    </form>
  );
};

export default ChangePasswordForm;
