import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../api/axiosConfig.js';  // Importamos Axios
import { decodeToken } from '../utils/jwtUtils';  // Importamos la función para decodificar el token

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // Añadimos un estado para manejar el tiempo de carga
  const [users, setUsers] = useState([]);  // Estado para almacenar los usuarios
  const [loadingUsers, setLoadingUsers] = useState(false);  // Estado para manejar la carga de usuarios
  const [errorUsers, setErrorUsers] = useState(null);  // Estado para manejar errores al obtener usuarios

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

  // Función para obtener usuarios y almacenarlos en el contexto
  // Ahora acepta un parámetro `forceUpdate` para forzar la actualización incluso si hay usuarios en la lista
  const getUsers = async (forceUpdate = false) => {
    if (users.length === 0 || forceUpdate) {  // Solo hace la solicitud si la lista está vacía o si se fuerza la actualización
      setLoadingUsers(true);  // Mostrar el estado de carga
      try {
        const response = await api.get('/user');
        setUsers(response.data);  // Almacenamos los usuarios obtenidos
      } catch (error) {
        setErrorUsers('Error al obtener usuarios');
        console.error('Error al obtener usuarios:', error);
      } finally {
        setLoadingUsers(false);  // Terminamos la carga
      }
    }
  };

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
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        getUsers,
        loading,  // Estado general de la autenticación
        users,  // Lista de usuarios obtenidos
        loadingUsers,  // Estado de carga de usuarios
        errorUsers  // Error al obtener usuarios
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
