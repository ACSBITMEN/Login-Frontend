import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard'; // Este es el layout principal que contiene el Navbar
import AdminUser from '../pages/AdminUser'; // Ruta exclusiva para admin
import Plantillas from '../pages/Plantillas'; // Ruta exclusiva para admin
import Inicio from '../pages/inicio'; // Ruta exclusiva para SMSApp
import Login from '../pages/Login';
import PrivateRoute from './PrivateRoute'; // Importamos la ruta privada
import useAuth from '../context/useAuth'; // Para manejar la autenticación

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />

      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />

      {/* El Dashboard como layout principal con las rutas hijas */}
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
        <Route path="adminUser" element={<PrivateRoute role="admin"><AdminUser /></PrivateRoute>} />
        {/* Ruta para cualquier usuario autenticado */}
        <Route path="plantillas" element={<PrivateRoute><Plantillas /></PrivateRoute>} />
        <Route path="Inicio" element={<PrivateRoute><Inicio /></PrivateRoute>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
