import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthProvider';  // Cambiamos la importación
import useAuth from './context/useAuth';  // Cambiamos la importación
import PropTypes from 'prop-types';

// Componente para proteger rutas privadas (solo para usuarios autenticados)
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// Validamos que la prop 'children' esté presente y sea de tipo node
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};



export default App;
