import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../api/axiosConfig.js';  // Importamos Axios

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // Añadimos un estado para manejar el tiempo de carga

  // Función para iniciar sesión
  const login = async (username, password) => {
    console.log('Enviando datos al backend:', { username, password });  // Log para verificar qué se está enviando
    try {
      const response = await api.post('/auth/login', { username, password });  // Usamos Axios para el login
      const { token } = response.data;  // Extraemos el token de la respuesta
      setUser({ token });
      localStorage.setItem('token', token);  // Guardamos el token en localStorage
      return true;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return false;
    }
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
      setUser({ username: 'UsuarioAutenticado', token });  // Simulamos un usuario autenticado
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
