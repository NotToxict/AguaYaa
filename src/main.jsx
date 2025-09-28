import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SnackbarProvider } from "notistack";// Asumiendo que has definido la base en config/app.js si no lo haces con Vite

// Layouts y Contextos
import RootLayout from "./layouts/RootLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx"; // <-- Nuevo Layout Admin
import { CartProvider } from "./context/CartContext.jsx";
import { UIProvider } from "./context/UIContext.jsx";
import { StoreProvider } from "./context/StoreContext.jsx";
// IMPORTANTE: Podrías necesitar un AuthProvider aquí en el futuro.

// Páginas de Cliente (Asegúrate de que todas existan en /src/pages/)
import HomePage from "./pages/HomePage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import StoresPage from "./pages/StoresPage.jsx";
import CatalogPage from "./pages/CatalogPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

// Páginas de Autenticación
import LoginPage from "./pages/auth/LoginPage.jsx"; // <-- Nueva página de Login

// Páginas de Local (Asegúrate de que existan en /src/pages/local/)
import LocalDashboardPage from "./pages/local/LocalDashboardPage.jsx";
import LocalProductsPage from "./pages/local/LocalProductsPage.jsx";

// Páginas de Repartidor (Asegúrate de que existan en /src/pages/delivery/)
import DeliveryDashboardPage from "./pages/delivery/DeliveryDashboardPage.jsx";


const router = createBrowserRouter([
  // RUTA PRINCIPAL (CLIENTE)
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "stores", element: <StoresPage /> },
      { path: "catalog", element: <CatalogPage /> },
      { path: "orders", element: <OrdersPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      // Fallback si no encuentra ninguna ruta
      { path: "*", element: <NotFoundPage /> }, 
    ],
  },
  
  // RUTAS DE AUTENTICACIÓN
  { path: "login", element: <LoginPage /> },

  // RUTAS DEL LOCAL (MARKETPLACE ROLE)
  {
    path: "local",
    element: <AdminLayout />, // Usa el layout administrativo
    children: [
      { index: true, element: <LocalDashboardPage /> }, // /local
      { path: "products", element: <LocalProductsPage /> }, // /local/products
      // Más rutas: pedidos, reportes, etc.
    ],
  },

  // RUTAS DEL REPARTIDOR (MARKETPLACE ROLE)
  {
    path: "delivery",
    element: <AdminLayout />, // Usa el layout administrativo
    children: [
      { index: true, element: <DeliveryDashboardPage /> }, // /delivery
      // Más rutas: mapa de ruta, historial de entregas, etc.
    ],
  },

], {
    // CRÍTICO 4: Usar la base de GitHub Pages en el Router (opcional si usas la de Vite)
    // El base de Vite es suficiente, pero si tu app no funcionara, usarías:
    // basename: '/AguaYaa/' 
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Todos los contextos deben envolver a la aplicación */}
    <StoreProvider>
      <UIProvider>
        <CartProvider>
          <SnackbarProvider
            maxSnack={3}
            autoHideDuration={2200}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <RouterProvider router={router} />
          </SnackbarProvider>
        </CartProvider>
      </UIProvider>
    </StoreProvider>
  </React.StrictMode>
);