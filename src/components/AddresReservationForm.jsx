import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { InputLabel } from "@mui/material";
import BasicSelect from "./SelectFormTimes";
import InputEmail from "@/commons/InputEmail"; // Asegúrate de que la ruta de importación sea correcta
import InputText from "@/commons/InputText"; // Asegúrate de que la ruta de importación sea correcta

export default function AddressForm({ times, onChange, value, label, clientName, clientEmail, clientPhone, setClientName, setClientEmail, setClientPhone }) {
  const [selectError, setSelectError] = useState(false);

  const handleSelectChange = (e) => {
    onChange(e);
    setSelectError(e.target.value === "");
  };
  
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <InputLabel id="demo-select-small-label">Seleccione un horario</InputLabel>
          <BasicSelect 
            times={times} 
            onChange={handleSelectChange} 
            value={value} 
            label={label} 
            error={selectError} 
            helperText={selectError ? "Este campo no puede estar vacío" : ""} 
          />
        </Grid>
        <Grid item xs={12}>
          <InputText
            label="Nombre y Apellido"
            name="clientName"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <InputEmail
            label="Correo Electrónico"
            name="clientEmail"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <InputText
            label="Teléfono"
            name="clientPhone"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
            type="tel"
            required
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}