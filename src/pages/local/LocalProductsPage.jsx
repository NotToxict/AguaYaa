import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function LocalProductsPage() {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Gestión de Catálogo
        </Typography>
        <Button variant="contained" startIcon={<AddCircleOutlineIcon />}>
          Añadir Producto
        </Button>
      </Box>
      <Typography color="text.secondary">
        Aquí podrás ver y editar los productos que ofreces. Necesitas conectar un backend para esta funcionalidad.
      </Typography>
      {/* Aquí iría una tabla o lista de productos con opciones de editar/eliminar */}
    </Box>
  );
}