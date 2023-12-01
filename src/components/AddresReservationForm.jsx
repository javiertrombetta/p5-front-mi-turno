import React, {useState} from "react";
import Grid from "@mui/material/Grid";
import { InputLabel } from "@mui/material";
import BasicSelect from "@/components/SelectFormTimes";
import InputEmail from "@/commons/InputEmail";
import InputText from "@/commons/InputText";

export default function AddressReservationForm({
  times, onChangeTime, valueTime, clientName, setClientName, clientEmail, setClientEmail, clientPhone, setClientPhone
}) {
  const [selectError, setSelectError] = useState(false);

  const handleSelectChange = (e) => {
    const timeValue = e.target.value;
    if (/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(timeValue)) {
      onChangeTime(e);
      setSelectError(false);
    } else {
      setSelectError(true);
    }
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <InputLabel id="demo-select-small-label">Seleccione un horario</InputLabel>
          <BasicSelect 
            times={times} 
            onChange={handleSelectChange} 
            value={valueTime} 
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
