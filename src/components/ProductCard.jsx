import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import { useCart } from '../context/CartContext';

function ProductCard({ product, onQuickView }) {
  const { hasItemsFromDifferentStore, clearCart, addItem } = useCart();
  const [confirmDialog, setConfirmDialog] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleCardClick = () => {
    // Check if adding this product would create a store conflict
    if (hasItemsFromDifferentStore(product.storeId)) {
      setConfirmDialog(true);
    } else {
      // No conflict, open quick view
      onQuickView(product);
    }
  };

  const handleConfirmStoreChange = () => {
    clearCart();
    setConfirmDialog(false);
    onQuickView(product);
  };

  const handleCancelStoreChange = () => {
    setConfirmDialog(false);
  };

  return (
    <>
      <Card 
        sx={{ 
          height: '100%',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 3
          },
          transition: 'all 0.2s'
        }}
        onClick={handleCardClick}
      >
        <CardMedia
          component="img"
          height="160"
          image={product.image}
          alt={product.name}
          sx={{ objectFit: 'cover' }}
        />
        
        <CardContent>
          <Typography variant="h6" component="h3" gutterBottom>
            {product.name}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {product.description}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
              {formatPrice(product.price)}
            </Typography>
            
            {product.sizes && product.sizes.length > 0 && (
              <Chip 
                label={product.sizes[0]} 
                size="small" 
                variant="outlined"
              />
            )}
          </Box>
          
          {!product.available && (
            <Chip 
              label="No disponible" 
              size="small" 
              color="error" 
              sx={{ mt: 1 }}
            />
          )}
        </CardContent>
      </Card>

      {/* Store Change Confirmation Dialog */}
      <Dialog
        open={confirmDialog}
        onClose={handleCancelStoreChange}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Cambiar de tienda</DialogTitle>
        <DialogContent>
          <Typography>
            Este producto es de una tienda diferente. Cambiar vaciará tu carrito actual. ¿Deseas continuar?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelStoreChange}>
            Cancelar
          </Button>
          <Button 
            onClick={handleConfirmStoreChange} 
            variant="contained"
            color="primary"
          >
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ProductCard;