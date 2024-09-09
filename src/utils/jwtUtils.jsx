import { jwtDecode } from "jwt-decode";

// Función para decodificar el token y extraer información útil (id y rol)
export const decodeToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    const { id, role } = decoded; // Suponiendo que el token tiene id y role
    return { id, role };
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return null; // En caso de error retornamos null
  }
};
