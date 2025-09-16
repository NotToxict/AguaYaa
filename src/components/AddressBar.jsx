import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Chip,
  IconButton
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import { useUI } from '../context/UIContext';

function AddressBar() {
  const { 
    address, 
    deliveryTime, 
    hasAddress, 
    hasDeliveryTime, 
    openAddressDialog 
  } = useUI();

  return (
    <Paper 
      elevation={1} 
      sx={{ 
        px: 2, 
        py: 1.5, 
        mx: 2, 
        mt: 1,
        mb: 2,
        borderRadius: 2,
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'action.hover'
        }
      }}
      onClick={openAddressDialog}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <LocationIcon color="primary" />
        
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Entregar en
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {hasAddress ? address : 'Agregar dirección'}
          </Typography>
        </Box>

        {hasDeliveryTime && (
          <Chip
            icon={<TimeIcon />}
            label={deliveryTime}
            size="small"
            variant="outlined"
            color="primary"
          />
        )}

        <IconButton size="small" color="primary">
          <EditIcon fontSize="small" />
        </IconButton>
      </Box>
    </Paper>
  );
}

export default AddressBar;