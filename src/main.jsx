import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import './index.css';

// 1. Definimos un tema básico para Material-UI
const theme = createTheme({
  palette: {
    mode: 'light', // Puedes cambiar a 'dark' fácilmente
    primary: {
      main: '#0077b6', // Un azul bonito para empezar
    },
    secondary: {
      main: '#ade8f4',
    },
  },
});

// 2. Creamos las rutas de nuestra aplicación
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // Aquí añadiremos las páginas (rutas hijas) más adelante
    children: [
      { index: true, element: <HomePage /> },
    ],
  },
]);

// 3. Renderizamos la aplicación
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* CssBaseline normaliza los estilos */}
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);