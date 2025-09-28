import React from 'react';
import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function LoginPage() {
  return (
    <Container maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
        <Typography variant="h5" component="h1" align="center" sx={{ mb: 3 }}>
          Acceso al Panel
        </Typography>
        <Box component="form" sx={{ display: 'grid', gap: 2 }}>
          <TextField label="Usuario/Email" fullWidth required />
          <TextField label="Contraseña" type="password" fullWidth required />
          <Button variant="contained" size="large" sx={{ mt: 2 }} component={RouterLink} to="/local">
            Iniciar Sesión (Local)
          </Button>
          <Button variant="outlined" size="large" component={RouterLink} to="/delivery">
            Iniciar Sesión (Repartidor)
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}