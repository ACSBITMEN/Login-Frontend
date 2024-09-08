import { useContext } from 'react';
import AuthContext from './AuthProvider';

// Hook para acceder al contexto de autenticación
const useAuth = () => useContext(AuthContext);

export default useAuth;
