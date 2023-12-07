"use client";
import { Button, Container } from "@mui/material";
import Checkout from "@/components/Checkout";
import { useEffect, useState } from "react";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useRouter } from "next/navigation";

const Reservation = () => {
  const router = useRouter();
  const initialCountdown = 120;
  const [countdown, setCountdown] = useState(initialCountdown);
  const formatTime = (time) => (time < 10 ? `0${time}` : time);
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  useEffect(() => {
    if (countdown === 0) {
      router.push('/reservations');
    }
  }, [countdown, router]);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;
  const isLastMinute = countdown <= 60;

  return (
    <Container
      maxWidth="lg"
      sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}
    >
      <Checkout />
      <Button
        variant="contained"
        color={isLastMinute ? "error" : "primary"}
        sx={{
          mt: 2, 
          py: 2,
          boxShadow: isLastMinute ? 3 : 1,
          transform: countdown % 10 === 0 ? 'scale(1.5)' : 'scale(1)',
          transition: 'transform 0.5s ease',
        }}
        startIcon={<AccessTimeIcon />}
      >
        {formatTime(minutes)}:{formatTime(seconds)}
      </Button>
    </Container>
  );
};

export default Reservation;

