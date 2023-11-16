'use client';

import React from 'react';
import Head from 'next/head';
import { Typography, Button, Box} from '@mui/material';

const Palette = () => {  
  return (
    <div>
      <Head>
        <title>Palette</title>
        <meta name="description" content="Paleta de trabajo" />
      </Head>
      <main>
        <Typography variant="h1">Encabezado H1</Typography>
        <Typography variant="h2">Encabezado H2</Typography>
        <Typography variant="h3">Encabezado H3</Typography>
        <Typography variant="h4">Encabezado H4</Typography>
        <Typography variant="h5">Encabezado H5</Typography>
        <Typography variant="h6">Encabezado H6</Typography>
        <Typography variant="body1">Texto del cuerpo body1</Typography>
        <Typography variant="body2">Texto del cuerpo body2</Typography>
        <Box sx={{ '& > button': { m: 1 } }}>
          <Button variant="contained" color="primary" sx={{ color: 'white', ':hover': { bgcolor: 'primary.dark', color: 'white' } }}>
            Botón Principal Oscuro
          </Button>
          <Button variant="contained" sx={{ bgcolor: 'primary.light', color: 'primary.main', ':hover': { bgcolor: 'primary.dark', color: 'white' } }}>
            Botón Principal Claro
          </Button>
          <Button variant="outlined" color="primary" sx={{ color: 'primary.main', ':hover': { bgcolor: 'primary.dark', color: 'white', borderColor:'primary.dark' } }}>
            Botón Principal Alternativo
          </Button>          
          <Button variant="contained" color="secondary" sx={{ color: 'white', ':hover': { bgcolor: 'secondary.dark', color: 'white' } }}>
            Botón Secundario Oscuro
          </Button>
          <Button variant="contained" sx={{ bgcolor: 'secondary.light', color: 'secondary.dark', ':hover': { bgcolor: 'secondary.dark', color: 'white' } }}>
            Botón Secundario Claro
          </Button>
          <Button variant="outlined" color="secondary" sx={{ color: 'secondary.main', ':hover': { bgcolor: 'secondary.dark', color: 'white', borderColor:'secondary.dark'  } }}>
            Botón Secundario Alternativo
          </Button>
          <Button variant="contained" color="error" sx={{ color: 'white', ':hover': { bgcolor: 'error.dark', color: 'white', borderColor:'error.dark' } }}>
            Botón Cancelar Oscuro
          </Button>
          <Button variant="contained" sx={{ bgcolor: 'error.light', color: 'error.main', ':hover': { bgcolor: 'error.dark', color: 'white' } }}>
            Botón Cancelar Claro
          </Button>
          <Button variant="outlined" color="error" sx={{ color: 'error.main', ':hover': { bgcolor: 'error.dark', color: 'white', borderColor:'error.dark' } }}>
            Botón Cancelar Alternativo
          </Button>   
        </Box>        
      </main>
    </div>  
  );
};

export default Palette;