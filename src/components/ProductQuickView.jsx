import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Divider
} from '@mui/material';
import {
  Close as CloseIcon,
  Add as AddIcon,
  Remove as RemoveIcon
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';

function ProductQuickView({ product, open, onClose }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');

  // Initialize selectedSize when product changes
  React.useEffect(() => {
    if (product && product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    } else {
      setSelectedSize('');
    }
    setQuantity(1);
  }, [product]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    addItem(product, quantity, selectedSize || null);
    onClose();
    setQuantity(1);
  };

  const getTotalPrice = () => {
    return product ? product.price * quantity : 0;
  };

  if (!product) return null;

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          maxHeight: '80vh'
        }
      }}
    >
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="h2">
            Agregar al carrito
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Product Info */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            sx={{
              width: 80,
              height: 80,
              borderRadius: 2,
              objectFit: 'cover'
            }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {product.description}
            </Typography>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
              {formatPrice(product.price)}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Size Selection */}
        {product.sizes && product.sizes.length > 1 && (
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Tamaño</InputLabel>
              <Select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                label="Tamaño"
              >
                {product.sizes.map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}

        {/* Quantity Selector */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Cantidad
          </Typography>
          <Paper 
            variant="outlined" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              width: 'fit-content',
              borderRadius: 2
            }}
          >
            <IconButton 
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              <RemoveIcon />
            </IconButton>
            <Typography 
              variant="h6" 
              sx={{ 
                minWidth: 40, 
                textAlign: 'center',
                fontWeight: 'bold'
              }}
            >
              {quantity}
            </Typography>
            <IconButton onClick={() => handleQuantityChange(1)}>
              <AddIcon />
            </IconButton>
          </Paper>
        </Box>

        {/* Total and Add Button */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Total
            </Typography>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
              {formatPrice(getTotalPrice())}
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="large"
            onClick={handleAddToCart}
            disabled={!product.available}
            sx={{ 
              minWidth: 120,
              borderRadius: 2
            }}
          >
            Agregar
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

export default ProductQuickView;