import AddresProfileForm from "../../components/AddresProfileForm";
import { Button, Container } from "@mui/material";
import Box from "@mui/material/Box";

import React from "react";

const page = () => {
  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{ my: 20, alignItems: "flex-end" }}
    >
      <Box>
        <AddresProfileForm />
      </Box>
      <Button variant="contained" sx={{ mt: 3, ml: 1 }}>
        Comfirm
      </Button>
    </Container>
  );
};

export default page;
