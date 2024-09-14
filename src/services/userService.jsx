// src/services/userService.jsx

import api from '../api/axiosConfig'; // Importa Axios configurado

// Obtener todos los usuarios
export const getAllUsers = async () => {
  try {
    const response = await api.get('/user'); // Realiza la solicitud GET a /user
    return response.data;  //  Devuelve los datos de la respuesta (usuarios)
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

// Obtener un usuario por ID
export const getUserById = async (id) => {
  try {
    const response = await api.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el usuario con ID: ${id}`, error);
    throw error;
  }
};

// Crear un nuevo usuario
export const createUser = async (userData) => {
  try {
    const response = await api.post('/user', userData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    throw error;
  }
};

// Actualizar un usuario por ID
export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/user/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el usuario con ID: ${id}`, error);
    throw error;
  }
};

// Eliminar un usuario por ID
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el usuario con ID: ${id}`, error);
    throw error;
  }
};
