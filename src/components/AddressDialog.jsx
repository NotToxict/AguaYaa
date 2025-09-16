import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  AccessTime as TimeIcon
} from '@mui/icons-material';
import { useUI } from '../context/UIContext';
import { DELIVERY_TIME_OPTIONS } from '../config/app';

function AddressDialog() {
  const {
    address,
    deliveryTime,
    customerName,
    customerPhone,
    notes,
    isAddressDialogOpen,
    closeAddressDialog,
    updateAddress,
    updateDeliveryTime,
    updateCustomerInfo
  } = useUI();

  const [formData, setFormData] = useState({
    address: '',
    deliveryTime: '',
    customerName: '',
    customerPhone: '',
    notes: ''
  });

  // Load current values when dialog opens
  useEffect(() => {
    if (isAddressDialogOpen) {
      setFormData({
        address: address || '',
        deliveryTime: deliveryTime || DELIVERY_TIME_OPTIONS[0],
        customerName: customerName || '',
        customerPhone: customerPhone || '',
        notes: notes || ''
      });
    }
  }, [isAddressDialogOpen, address, deliveryTime, customerName, customerPhone, notes]);

  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSave = () => {
    updateAddress(formData.address);
    updateDeliveryTime(formData.deliveryTime);
    updateCustomerInfo({
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      notes: formData.notes
    });
    closeAddressDialog();
  };

  const handleCancel = () => {
    closeAddressDialog();
  };

  const isFormValid = formData.address.trim().length > 0;

  return (
    <Dialog
      open={isAddressDialogOpen}
      onClose={handleCancel}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocationIcon color="primary" />
          <Typography variant="h6">
            Información de entrega
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          {/* Address */}
          <TextField
            label="Dirección de entrega"
            value={formData.address}
            onChange={handleChange('address')}
            fullWidth
            required
            multiline
            rows={2}
            placeholder="Ej: Carrera 15 #32-45, Apto 301, Edificio Torre Azul"
            helperText="Incluye detalles como apartamento, oficina, referencias, etc."
          />

          {/* Delivery Time */}
          <FormControl fullWidth>
            <InputLabel>Hora de entrega</InputLabel>
            <Select
              value={formData.deliveryTime}
              onChange={handleChange('deliveryTime')}
              label="Hora de entrega"
              startAdornment={<TimeIcon sx={{ mr: 1, color: 'action.active' }} />}
            >
              {DELIVERY_TIME_OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Customer Name */}
          <TextField
            label="Tu nombre"
            value={formData.customerName}
            onChange={handleChange('customerName')}
            fullWidth
            placeholder="Nombre completo"
          />

          {/* Customer Phone */}
          <TextField
            label="Teléfono"
            value={formData.customerPhone}
            onChange={handleChange('customerPhone')}
            fullWidth
            type="tel"
            placeholder="Ej: 3001234567"
            helperText="Para coordinar la entrega"
          />

          {/* Notes */}
          <TextField
            label="Notas adicionales (opcional)"
            value={formData.notes}
            onChange={handleChange('notes')}
            fullWidth
            multiline
            rows={2}
            placeholder="Instrucciones especiales, puntos de referencia, etc."
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleCancel}>
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!isFormValid}
          sx={{ borderRadius: 2 }}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddressDialog;