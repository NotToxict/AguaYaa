import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Alert
} from '@mui/material';
import {
  ListAlt as OrdersIcon
} from '@mui/icons-material';

function OrdersPage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 3 }}>
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <OrdersIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Mis pedidos
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Aquí podrás ver el historial de tus pedidos
          </Typography>
        </Box>

        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
          <Alert severity="info" sx={{ borderRadius: 2 }}>
            <Typography variant="body1">
              Esta funcionalidad estará disponible pronto. 
              Por ahora, tus pedidos se gestionan directamente por WhatsApp.
            </Typography>
          </Alert>
        </Paper>
      </Box>
    </Container>
  );
}

export default OrdersPage;