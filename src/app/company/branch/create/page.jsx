import * as React from 'react';
import FormBranch from '@/components/FormBranch';
import { Container, Typography, Box } from '@mui/material';

export default function EditBranchPage() {
  return (
    <Container maxWidth="sm">
      <Box my={10}>
        <Typography variant="h5" textAlign="center" component="h5" gutterBottom>
          Crear una nueva sucursal
        </Typography>
        <FormBranch />
      </Box>
    </Container>
  );
}