import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import { InputLabel, MenuItem } from "@mui/material";

export default function AddressForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Termine su reserva
      </Typography>
      <Grid item xs={12} sm={6}>
        <InputLabel id="demo-select-small-label">
          Seleccione un horario
        </InputLabel>
        <Select
          fullWidth
          labelId="demo-select-small-label"
          id="demo-select-small"
          value="timetable"
          label="Timetable"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>10:00</MenuItem>
          <MenuItem value={20}>10:15</MenuItem>
          <MenuItem value={30}>10:30</MenuItem>
          <MenuItem value={40}>10:45</MenuItem>
          <MenuItem value={50}>11:00</MenuItem>
          <MenuItem value={60}>11:15</MenuItem>
          <MenuItem value={70}>11:30</MenuItem>
          <MenuItem value={80}>11:45</MenuItem>
          <MenuItem value={90}>12:00</MenuItem>
          <MenuItem value={100}>12:15</MenuItem>
          <MenuItem value={110}>12:30</MenuItem>
          <MenuItem value={120}>12:45</MenuItem>
        </Select>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Nombre"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Apellido"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Correo Electrónico"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Contraseña"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Telefono"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="DNI"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </React.Fragment>
  );
}
