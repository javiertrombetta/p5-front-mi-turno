import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import { Divider } from "@mui/material";

const CancelReservation = ({ usuario, onBackButtonClick }) => {
  const [reasons, setReasons] = useState({
    noQuieroIr: false,
    meEquivoqueDeHorario: false,
    encontreLugarMejor: false,
    meCancelaron: false,
    otro: false,
  });

  const data = {
    nombre: "Carlos Menem",
  };

  const handleCheckboxChange = (event) => {
    setReasons({ ...reasons, [event.target.name]: event.target.checked });
  };

  const handleCancelClick = () => {
  };

  return (
    <Box marginLeft={6} maxWidth={650}>
      <Button variant="text" color="primary" onClick={onBackButtonClick}>
        <ArrowBackIcon /> Atrás
      </Button>
      <br />
      <br />

      <Typography variant="h5" gutterBottom>
        Cancelar Reserva
      </Typography>
      <Typography variant="body1" gutterBottom>
        ¡Hola <b>{data.nombre}</b> !!
        <br />
        <br />
        ¿Por qué desea cancelar su reserva?
      </Typography>
      <Divider />
      <Box mt={2} mb={2} display="flex" flexDirection="column">
        <FormControlLabel
          control={
            <Checkbox
              checked={reasons.noQuieroIr}
              onChange={handleCheckboxChange}
              name="noQuieroIr"
            />
          }
          label="Ya no quiero ir"
        />
        <Divider />

        <FormControlLabel
          control={
            <Checkbox
              checked={reasons.meEquivoqueDeHorario}
              onChange={handleCheckboxChange}
              name="meEquivoqueDeHorario"
            />
          }
          label="Me equivoqué de horario"
        />
        <Divider />

        <FormControlLabel
          control={
            <Checkbox
              checked={reasons.encontreLugarMejor}
              onChange={handleCheckboxChange}
              name="encontreLugarMejor"
            />
          }
          label="Encontré un lugar mejor"
        />
        <Divider />

        <FormControlLabel
          control={
            <Checkbox
              checked={reasons.meCancelaron}
              onChange={handleCheckboxChange}
              name="meCancelaron"
            />
          }
          label="Me cancelaron"
        />
        <Divider />

        <FormControlLabel
          control={
            <Checkbox
              checked={reasons.otro}
              onChange={handleCheckboxChange}
              name="otro"
            />
          }
          label="Otro"
        />
      </Box>
      <Button variant="contained" color="error" onClick={handleCancelClick}>
        Cancelar Reserva
      </Button>
    </Box>
  );
};

export default CancelReservation;
