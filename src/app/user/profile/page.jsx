"use client";

import { Container } from "@mui/material";
import UserCard from "@/components/UserCard";
 import EditProfileForm from "@/components/AddresProfileForm";

const page = () => {
  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        backgroundColor: "#f2f2f2", // Color gris claro
        padding: 3,
      }}
    >
      <UserCard />
    <EditProfileForm />
    </Container>
  );
};

export default page;
