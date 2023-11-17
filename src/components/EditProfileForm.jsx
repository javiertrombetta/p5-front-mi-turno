import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useState } from "react";

const EditProfileForm = () => {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    password: "********",
    dni: "12345678",
    phone: "123-456-7890",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Agrega la lógica para enviar los datos al servidor o realizar acciones necesarias.
    console.log("Datos enviados:", formData);
  };

  return (
    <Card sx={{ maxWidth: { xs: 400, md: 600 }, margin: "auto", marginTop: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Editar
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 2, md: 3 }}
          >
            <TextField
              fullWidth
              margin="normal"
              label="Nombre y Apellido"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Stack>
          <br />
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 2, md: 3 }}
          >
            <TextField
              fullWidth
              margin="normal"
              label="Contraseña"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="DNI"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
            />
          </Stack>
          <TextField
            fullWidth
            margin="normal"
            label="Telefono"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Confirmar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditProfileForm;
