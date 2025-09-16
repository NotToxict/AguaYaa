import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useUI } from '../context/UIContext';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/format';

export default function ProductQuickView() {
  const { quickViewProduct, closeQuickView } = useUI();
  const { addItem, items, clear } = useCart();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setQty(1);
  }, [quickViewProduct]);

  const p = quickViewProduct;
  const open = Boolean(p);

  const addToCart = () => {
    if (!p) return;
    if (items.length > 0) {
      const currentStore = items[0].storeId;
      if (currentStore && currentStore !== p.storeId) {
        const ok = window.confirm('Tu carrito pertenece a otra tienda. Cambiar de tienda vaciará tu carrito. ¿Continuar?');
        if (!ok) return;
        clear();
      }
    }
    for (let i = 0; i < qty; i += 1) addItem(p);
    closeQuickView();
  };

  return (
    <Drawer anchor="bottom" open={open} onClose={closeQuickView} PaperProps={{ sx: { borderTopLeftRadius: 16, borderTopRightRadius: 16 } }}>
      {p && (
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">{p.name}{p.size ? ' · ' + p.size : ''}</Typography>
            <IconButton onClick={closeQuickView}><CloseIcon /></IconButton>
          </Box>

          <Box
            sx={{
              mt: 1.5,
              height: 160,
              bgcolor: 'primary.light',
              borderRadius: 2,
              color: 'primary.contrastText',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
            }}
          >
            {p.imageUrl ? (
              <img src={p.imageUrl} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} />
            ) : (
              p.size ?? p.name
            )}
          </Box>

          <Typography variant="h5" sx={{ mt: 2 }}>{formatCurrency(p.price)}</Typography>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton onClick={() => setQty((q) => Math.max(1, q - 1))}><RemoveIcon /></IconButton>
              <Typography minWidth={24} textAlign="center">{qty}</Typography>
              <IconButton onClick={() => setQty((q) => Math.min(99, q + 1))}><AddIcon /></IconButton>
            </Box>
            <Button variant="contained" onClick={addToCart}>
              Agregar {qty > 1 ? `(${qty})` : ''}
            </Button>
          </Box>
        </Box>
      )}
    </Drawer>
  );
}