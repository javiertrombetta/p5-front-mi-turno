"use client";
import { Button, Container } from "@mui/material";
import Checkout from "@/components/Checkout";
import { useEffect, useState } from "react";

const Reservation = () => {
  const initialCountdown = 180;
  const [countdown, setCountdown] = useState(initialCountdown);
  const formatTime = (time) => (time < 10 ? `0${time}` : time);
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);
    return () => {
      clearInterval(timer);
      if (countdown === 0) {
        window.location.reload();
      }
    };
  }, [countdown]);

  useEffect(() => {
    if (countdown === 0) {
      setCountdown(initialCountdown);
    }
  }, [countdown]);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  return (
    <Container
      maxWidth="lg"
      sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}
    >
      <Checkout />
      <Button variant="contained" color="primary" sx={{ mt: 2, py: 2 }}>
        {formatTime(minutes)}:{formatTime(seconds)}
      </Button>
    </Container>
  );
};

export default Reservation;
