// pages/reservation/index.js
import React from 'react';
import Navbar from '../../../components/Navbarzzz';
import Thanks from '../../../components/ReservationThanks';
import ReservationDetails from '../../../components/ReservationDetails';
import { Box, Card, Container, Divider } from '@mui/material';

export default function ReservationPage() {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Card variant="none" sx={{ my: 4 }}>
          <Box sx={{ my: 5 }}>
            <Thanks />
          </Box>
          <Divider />
          <Box sx={{ my: 5 }}>
            <ReservationDetails />
          </Box>
        </Card>
      </Container>
    </>
  );
}