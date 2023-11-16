import { Card, CardContent, Divider, Typography } from "@mui/material";

const ReservationCard = () => {
  return (
    <div marginLeft={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Información de la reserva
        </Typography>
        <Typography variant="h6" gutterBottom>
          Carlos Menem <br />
        </Typography>
        <Typography variant="body1">
          <b>Día:</b> 23/11/2023 <br />
          <b>Horario:</b> 10:00 hs <br />
          <b>Sucursal:</b>Villa Crespo
        </Typography>
      </CardContent>
      <Divider />
    </div>
  );
};

export default ReservationCard;
