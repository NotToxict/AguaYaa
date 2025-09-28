import React from "react";
import ReactDOM from "react-dom/client";
// IMPORTAR createHashRouter en lugar de createBrowserRouter
import { createHashRouter, RouterProvider, Navigate } from "react-router-dom"; 
import { SnackbarProvider } from "notistack";
import "./index.css";

// LAYOUTS Y CONTEXTOS
import RootLayout from "./layouts/RootLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { UIProvider } from "./context/UIContext.jsx";
import { StoreProvider } from "./context/StoreContext.jsx";
// Contexto de Autenticación y Protección de Rutas
import { AuthProvider, ProtectedRoute } from "./context/AuthContext.jsx";


// PÁGINAS DE CLIENTE
import HomePage from "./pages/HomePage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import StoresPage from "./pages/StoresPage.jsx";
import CatalogPage from "./pages/CatalogPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

// PÁGINAS DE AUTENTICACIÓN
import LoginPage from "./pages/auth/LoginPage.jsx";

// PÁGINAS DE LOCAL
import LocalDashboardPage from "./pages/local/LocalDashboardPage.jsx";
import LocalProductsPage from "./pages/local/LocalProductsPage.jsx";

// PÁGINAS DE REPARTIDOR
import DeliveryDashboardPage from "./pages/delivery/DeliveryDashboardPage.jsx";


// Usamos createHashRouter y eliminamos el basename
const router = createHashRouter([
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

  // RUTAS DEL LOCAL (MARKETPLACE ROLE) - PROTEGIDAS
  {
    path: "local",
    element: <ProtectedRoute element={<AdminLayout />} requiredRole="local" />, 
    children: [
      { index: true, element: <LocalDashboardPage /> },
      { path: "products", element: <LocalProductsPage /> },
    ],
  },

  // RUTAS DEL REPARTIDOR (MARKETPLACE ROLE) - PROTEGIDAS
  {
    path: "delivery",
    element: <ProtectedRoute element={<AdminLayout />} requiredRole="delivery" />, 
    children: [
      { index: true, element: <DeliveryDashboardPage /> },
    ],
  },
], {
    // ELIMINAMOS LA PROPIEDAD basename, ya que HashRouter no la necesita
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* TODOS LOS CONTEXTOS DEBEN ENVOLVER A LA APLICACIÓN */}
    <StoreProvider>
      <UIProvider>
        <CartProvider>
          {/* El AuthProvider debe envolver al RouterProvider */}
          <AuthProvider> 
            <SnackbarProvider
              maxSnack={3}
              autoHideDuration={2200}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <RouterProvider router={router} />
            </SnackbarProvider>
          </AuthProvider>
        </CartProvider>
      </UIProvider>
    </StoreProvider>
  </React.StrictMode>
);