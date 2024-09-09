//Aqui es donde se definen todas las rutas de la app
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import AdminUser from '../pages/AdminUser'; // Ruta exclusiva para admin
import PrivateRoute from './PrivateRoute'; // Importamos la ruta privada
import useAuth from '../context/useAuth'; // Para manejar la autenticación

const AppRoutes = () => {
  const { user, loading } = useAuth(); // // Obtenemos el usuario en el contexto global y el estado de carga

  // Mientras esté en estado de carga, mostramos un componente de espera o un spinner
  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <Routes>
      {/* Ruta para login, si el usuario está autenticado, lo redirigimos al Dashboard */}
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" /> : <Login />}
      />

      {/* Redirección de '/' a '/login' o '/dashboard' según la autenticación */}
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />

      {/* Rutas privadas */}
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

      {/* Ruta solo para admin, protegida con PrivateRoute y verificación de rol */}
      <Route path="/dashboard/adminUser" element={<PrivateRoute role="admin"><AdminUser /></PrivateRoute>} />

      {/* Puedes añadir más rutas privadas o públicas aquí */}
    </Routes>
  );
};

export default AppRoutes;
