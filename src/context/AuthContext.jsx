import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom'; // Asegúrate de que Navigate está importado

const AuthContext = createContext(null);
const STORAGE_KEY = 'aguaya_auth_user_v1';
const BASE_URL = '/AguaYaa'; // <-- DEFINICIÓN DE LA RUTA BASE

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); 

  // ... (código de carga y persistencia en localStorage)

  const value = useMemo(() => {
    const isAuthenticated = !!user;
    
    const login = (role) => {
      let newUser = {};
      if (role === 'local') {
        newUser = { id: 'L01', name: 'Tienda Central', role: 'local' };
        navigate(`${BASE_URL}/local`); // <-- RUTA ABSOLUTA FORZADA
      } else if (role === 'delivery') {
        newUser = { id: 'D01', name: 'Juan Repartidor', role: 'delivery' };
        navigate(`${BASE_URL}/delivery`); // <-- RUTA ABSOLUTA FORZADA
      } else {
        newUser = { id: 'C01', name: 'Cliente Frecuente', role: 'client' };
        navigate(BASE_URL); // <-- RUTA BASE FORZADA (AQUÍ DEBE RESOLVER EL INICIO)
      }
      setUser(newUser);
    };

    const logout = () => {
      setUser(null);
      navigate(`${BASE_URL}/login`); // <-- RUTA ABSOLUTA FORZADA
    };

    const hasRole = (requiredRole) => user?.role === requiredRole;

    return {
      user,
      isAuthenticated,
      role: user?.role,
      login,
      logout,
      hasRole,
    };
  }, [user, navigate]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}

// Exportar el componente para protección de rutas (lo usaremos en main.jsx)
export function ProtectedRoute({ element, requiredRole }) {
  const { isAuthenticated, hasRole } = useAuth();
  const LOGIN_PATH = `${BASE_URL}/login`;
  
  if (!isAuthenticated) {
    return <Navigate to={LOGIN_PATH} replace />; // <-- RUTA ABSOLUTA FORZADA
  }

  if (requiredRole && !hasRole(requiredRole)) {
    console.warn(`Acceso denegado: Rol ${requiredRole} requerido.`);
    return <Navigate to={BASE_URL} replace />; // Redirigir a la base
  }

  return element;
}