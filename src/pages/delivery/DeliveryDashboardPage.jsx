import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

export default function DeliveryDashboardPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Tablero de Repartidor
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" color="primary">Entregas Asignadas: 2</Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Tu ruta de hoy: verifica las direcciones y actualiza el estado al entregar.
        </Typography>
      </Paper>
      {/* Aquí iría la lista de pedidos asignados al repartidor */}
    </Box>
  );
}