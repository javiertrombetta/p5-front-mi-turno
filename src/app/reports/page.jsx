"use client";
import ChartLinesCard from "@/commons/ChartLinesCard";
import ChartPiesCard from "@/commons/ChartPiesCard";
import CardTotalAssists from "@/components/CardTotalAssists";
import CardTotalCancelations from "@/components/CardTotalCancelations";
import CardTotalReservation from "@/components/CardTotalReservation";
import ChartWithTitle from "@/components/ChartWithTitle";
import { Container } from "@mui/material";
import React from "react";

const page = () => {
  return (
    <>
      <Container
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          /* gridTemplateRows: "1fr 1fr 1fr", */
          gap: "20px",
        }}
      >
        <CardTotalReservation />
        <CardTotalAssists />
        <CardTotalCancelations />
        {/* 
        <CardTotalCancelations /> */}
      </Container>
      <br />
      <Container
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gridTemplateRows: "1fr 1fr",
          gap: "20px",
        }}
      >
        <ChartPiesCard />
        <ChartLinesCard style={{ gap: "20px", marginBottom: "10px" }} />
      </Container>
      <Container>
        <ChartWithTitle />
      </Container>
    </>
  );
};

export default page;
