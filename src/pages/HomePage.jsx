import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function HomePage() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          ¡Bienvenido a AguaYa!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Tu app de delivery favorita
        </Typography>
      </Box>
    </Container>
  );
}

export default HomePage;
