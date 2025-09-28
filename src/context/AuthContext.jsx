import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);
const STORAGE_KEY = 'aguaya_auth_user_v1';

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // { id: 1, name: 'Local A', role: 'local' }

  // Carga inicial del usuario desde localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setUser(JSON.parse(raw));
      }
    } catch (e) {
      console.error('Error al cargar auth:', e);
    }
  }, []);

  // Persistencia en localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.error('Error al guardar auth:', e);
    }
  }, [user]);

  const value = useMemo(() => {
    const isAuthenticated = !!user;
    
    // Simulación de inicio de sesión por rol
    const login = (role) => {
      let newUser = {};
      if (role === 'local') {
        newUser = { id: 'L01', name: 'Tienda Central', role: 'local' };
        navigate('/local');
      } else if (role === 'delivery') {
        newUser = { id: 'D01', name: 'Juan Repartidor', role: 'delivery' };
        navigate('/delivery');
      } else {
        // Asume login de cliente (no lo usaremos por ahora)
        newUser = { id: 'C01', name: 'Cliente Frecuente', role: 'client' };
        navigate('/');
      }
      setUser(newUser);
    };

    const logout = () => {
      setUser(null);
      navigate('/login');
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

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    // Si el usuario no tiene el rol, puede ser redirigido a su propio panel o a un 404
    console.warn(`Acceso denegado: Rol ${requiredRole} requerido.`);
    return <Navigate to="/" replace />; // Redirigir al inicio o a su panel
  }

  return element;
}