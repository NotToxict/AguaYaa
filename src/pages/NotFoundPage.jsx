import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button
} from '@mui/material';
import {
  Error as ErrorIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <ErrorIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          Página no encontrada
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          La página que buscas no existe o ha sido movida.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={handleGoHome}
          sx={{ borderRadius: 2 }}
        >
          Volver al inicio
        </Button>
      </Box>
    </Container>
  );
}

export default NotFoundPage;