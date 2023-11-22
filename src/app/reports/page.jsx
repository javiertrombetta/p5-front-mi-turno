"use client";
import ChartLinesCard from "@/commons/ChartLinesCard";
import ChartPiesCard from "@/commons/ChartPiesCard";
import CardTotalAssists from "@/components/CardTotalAssists";
import CardTotalCancelations from "@/components/CardTotalCancelations";
import CardTotalReservation from "@/components/CardTotalReservation";
import ChartWithTitle from "@/components/ChartWithTitle";
import BasicSelect from "@/components/SelectForm";
import { Container, Typography } from "@mui/material";

import React from "react";

const page = () => {
  return (
    <>
      <Container
        sx={{
          /* width: "30%", */
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
        }}
      >
        <div>
          <Typography variant="h6" gutterBottom>
            Filtro de sucursales
          </Typography>
          <BasicSelect />
          <br />
        </div>

        <br />
      </Container>
      <Container
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "2fr",
          gap: "20px",
        }}
      >
        <CardTotalReservation />
        <CardTotalAssists />
        <CardTotalCancelations />
      </Container>
      <br />
      <Container
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gridTemplateRows: "2fr",
          gap: "20px",
        }}
      >
        <ChartPiesCard />
        <ChartLinesCard style={{ gap: "20px", marginBottom: "10px" }} />
      </Container>
      <br />
      <Container>
        <ChartWithTitle />
      </Container>
    </>
  );
};

export default page;
