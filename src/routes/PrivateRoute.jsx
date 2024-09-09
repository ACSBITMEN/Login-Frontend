// componente de rutas para proteger las rutas PRIVADAS
import { Navigate } from 'react-router-dom';
import useAuth from '../context/useAuth';
import PropTypes from 'prop-types';

// Componente para proteger rutas privadas
const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>; // Muestra un indicador de carga mientras se verifica el usuario
  }

  // Si no hay usuario autenticado, redirigimos al login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si se pasa un rol, verificamos que el usuario tenga el rol adecuado
  if (role && user.role !== role) {
    return <Navigate to="/dashboard" />; // Si el rol no coincide, redirigimos al dashboard
  }

  // Si todo es correcto, renderizamos el contenido protegido
  return children;
};

// Validamos que la prop 'children' esté presente y sea de tipo node
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  role: PropTypes.string, // El rol es opcional, solo para ciertas rutas
};

export default PrivateRoute;
