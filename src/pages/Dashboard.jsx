import { useNavigate } from 'react-router-dom';
import useAuth from '../context/useAuth';  // Importamos el contexto de autenticación

const Dashboard = () => {
  const { logout } = useAuth();  // Usamos la función de logout del contexto
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();  // Llamamos a la función logout para cerrar sesión
    navigate('/login');  // Redirigimos al usuario al login
  };

  return (
    <div>
      <h1>Bienvenido al Dashboard</h1>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default Dashboard;
