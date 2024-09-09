import { useNavigate } from 'react-router-dom';
import useAuth from '../context/useAuth';  // Importamos el contexto de autenticación

const Dashboard = () => {
  const { logout } = useAuth();  // Usamos la función de logout del contexto
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();  // Llamamos a la función logout para cerrar sesión
    navigate('/login');  // Redirigimos al usuario al login
  };

  const { user } = useAuth();

  return (
    <div>
      <h1>Bienvenido al Dashboard</h1>
      {user ? (
        <div>
          <h1>Bienvenido, Usuario con ID: {user.id}</h1>
          <p>Tu rol es: {user.role}</p>
        </div>
      ) : (
        <h1>No has iniciado sesión</h1>
      )}
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default Dashboard;
