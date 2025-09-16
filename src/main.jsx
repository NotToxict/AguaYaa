import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

import App from './App.jsx';
import './index.css';

// Pages
import HomePage from './pages/HomePage.jsx';
import StoresPage from './pages/StoresPage.jsx';
import CatalogPage from './pages/CatalogPage.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

// Tema (puedes mantener azul o pasarnos a naranja tipo delivery)
const theme = createTheme({
  shape: { borderRadius: 10 },
  palette: {
    mode: 'light',
    primary: { main: '#0077b6' }, // cambia a '#FF5A00' si quieres look Rappi
    secondary: { main: '#00B2FF' },
    background: { default: '#fafafa' },
  },
  components: {
    MuiButton: {
      styleOverrides: { root: { textTransform: 'none', fontWeight: 600 } },
    },
  },
});

// Rutas
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/stores', element: <StoresPage /> },
      { path: '/catalog', element: <CatalogPage /> }, // requiere tienda seleccionada
      { path: '/cart', element: <CartPage /> },
      { path: '/checkout', element: <CheckoutPage /> },
      { path: '/orders', element: <OrdersPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);