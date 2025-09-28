import React, { useState } from 'react';
import { 
  Typography, 
  Box, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  IconButton,
  Modal,
  TextField,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatCurrency } from '../../utils/format'; // Reutilizamos la utilidad de formato

// Datos de productos simulados para el local (vendrán de la API)
const mockProducts = [
    { id: 'garrafon-20l', name: 'Garrafón 20L', price: 35.00, inventory: 150, status: 'Activo' },
    { id: 'botella-1l', name: 'Botella 1L', price: 12.00, inventory: 500, status: 'Activo' },
    { id: 'hielo-5kg', name: 'Hielo 5kg', price: 25.00, inventory: 0, status: 'Agotado' },
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

// Componente de Modal para Añadir/Editar Producto
const ProductModal = ({ open, handleClose, product = {} }) => {
  const [name, setName] = useState(product.name || '');
  const [price, setPrice] = useState(product.price || '');
  const [inventory, setInventory] = useState(product.inventory || 0);

  const handleSubmit = () => {
    // Lógica para enviar los datos a la futura API
    console.log('Guardando producto:', { name, price, inventory });
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          {product.id ? 'Editar Producto' : 'Añadir Nuevo Producto'}
        </Typography>
        <TextField
          label="Nombre del Producto"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Precio"
          type="number"
          fullWidth
          margin="normal"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          label="Inventario Disponible"
          type="number"
          fullWidth
          margin="normal"
          value={inventory}
          onChange={(e) => setInventory(e.target.value)}
        />
        <Button 
          variant="contained" 
          onClick={handleSubmit} 
          fullWidth 
          sx={{ mt: 3 }}
        >
          Guardar
        </Button>
      </Box>
    </Modal>
  );
};


export default function LocalProductsPage() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpen = (product = null) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
    setSelectedProduct(null);
  };
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Gestión de Catálogo
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => handleOpen(null)}
        >
          Añadir Producto
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Producto</TableCell>
              <TableCell align="right">Precio</TableCell>
              <TableCell align="right">Inventario</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell align="right">{formatCurrency(product.price)}</TableCell>
                <TableCell align="right" color={product.inventory === 0 ? 'error' : 'inherit'}>
                  {product.inventory}
                </TableCell>
                <TableCell>
                  <Chip 
                    label={product.status} 
                    color={product.status === 'Activo' ? 'success' : 'error'} 
                    size="small" 
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleOpen(product)} size="small" color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ProductModal open={openModal} handleClose={handleClose} product={selectedProduct} />

    </Box>
  );
}