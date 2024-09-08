import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // Añadimos un estado para manejar el tiempo de carga

  // Función para iniciar sesión
  const login = (username, password) => {
    if (username === 'admin' && password === '1234') {
      const token = 'fake-token';  // Simulamos un token
      setUser({ username, token });  // Guardamos el usuario y el token
      localStorage.setItem('token', token);  // Guardamos el token en localStorage
      return true;
    }
    return false;
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');  // Eliminamos el token de localStorage
  };

  // Verificamos si hay un token almacenado en localStorage al cargar la app
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Simulamos que el usuario es 'admin' si el token está presente
      setUser({ username: 'admin', token });
    }
    setLoading(false);  // Ya hemos terminado de verificar
  }, []);  // Este useEffect se ejecuta solo una vez al montar el componente

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
