import React from "react";
import Thanks from "@/components/ReservationThanks";
import ReservationDetails from "@/components/ReservationDetails";
import { Box, Card, Container, Divider } from "@mui/material";
import Footer from "@/commons/Footer";

export default function ReservationPage() {
  return (
    <Container maxWidth="lg">
      <Card variant="none">
        <Box sx={{ my: 10 }}>
          <Thanks />
        </Box>
        <Divider />
        <Box sx={{ my: 10 }}>
          <ReservationDetails />
        </Box>
      </Card>
    </Container>
  );
}
