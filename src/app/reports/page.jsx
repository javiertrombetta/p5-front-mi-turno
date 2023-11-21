"use client";
import CardTotalAssists from "@/components/CardTotalAssists";
import CardTotalCancelations from "@/components/CardTotalCancelations";
import CardTotalReservation from "@/components/CardTotalReservation";
import ChartLines from "@/components/ChartLines";
import ChartPies from "@/components/ChartPies";
import { Container } from "@mui/material";
import React from "react";

const page = () => {
  return (
    <>
      <Container
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gridTemplateRows: "1fr 1fr 1fr",
          gap: "20px",
        }}
      >
        <CardTotalReservation />

        <CardTotalCancelations />
      </Container>
      {/* <ChartLines /> */}

      {/* <ChartPies /> */}
    </>
  );
};

export default page;
