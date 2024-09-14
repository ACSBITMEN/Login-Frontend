import axios from 'axios';

// Configuramos una instancia de Axios
const api = axios.create({
  baseURL: 'http://localhost:3000',  // URL del backend que se este usando.
});

// Interceptor para agregar el token a todas las solicitudes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');  // Obtenemos el token de localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;  // Agregamos el token en el header Authorization
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
