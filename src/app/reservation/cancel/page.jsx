"use client";
import CancelReservation from "@/components/CancelReservation";
import ReservationCard from "@/components/ReservationCard";
import { Container, Grid } from "@mui/material";

const page = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          {/* En pantallas pequeñas (xs) toma el 100% del ancho, en pantallas medianas (md) toma el 75% */}
          <CancelReservation />
        </Grid>
        <Grid item xs={12} md={3}>
          {/* En pantallas pequeñas (xs) toma el 100% del ancho, en pantallas medianas (md) toma el 25% */}
          <ReservationCard />
        </Grid>
      </Grid>
    </Container>
  );
};

export default page;
