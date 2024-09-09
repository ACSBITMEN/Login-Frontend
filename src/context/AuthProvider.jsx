import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../api/axiosConfig.js';  // Importamos Axios
import { decodeToken } from '../utils/jwtUtils';  // Importamos la función para decodificar el token

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // Añadimos un estado para manejar el tiempo de carga

  // Verificamos si hay un token almacenado en localStorage al cargar la app
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = decodeToken(token);  // Decodificamos el token
      if (decoded) {
        setUser({ ...decoded, token });
      }
    }
    setLoading(false);  // Ya hemos terminado de verificar
  }, []);  // Este useEffect se ejecuta solo una vez al montar el componente

  // Función para iniciar sesión
  const login = async (username, password) => {
    try {
      const response = await api.post('/auth/login', { username, password });  // Usamos Axios para el login
      const { token } = response.data;  // Extraemos el token de la respuesta
      const decoded = decodeToken(token);  // Decodificamos el token para obtener id y rol

      if (decoded) {
        setUser({ ...decoded, token });  // Guardamos la info decodificada y el token
        localStorage.setItem('token', token);
        return true;
      }

      return false;  // En caso de que no se pueda decodificar, no hacemos login
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
