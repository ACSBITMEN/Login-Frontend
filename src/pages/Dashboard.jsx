import { useState } from 'react'; // Para manejar el estado
import { Outlet } from 'react-router-dom'; // Para renderizar las rutas hijas dentro del dashboard
import Navbar from '../components/Navbar'; // Importamos el Navbar
import '../styles/pages/Dashboard.css';  // Importamos los estilos

const Dashboard = () => {
  const [isExpanded, setIsExpanded] = useState(false); // Estado para el menú expandido

  // Función para alternar el estado del menú
  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`dashboard-container ${isExpanded ? 'expanded' : ''}`}>
      <Navbar onToggle={toggleNavbar} /> {/* Navbar se muestra siempre */}
      <div className="dashboard-content">
        <Outlet /> {/* Aquí se renderizan las secciones del dashboard */}
      </div>
    </div>
  );
};

export default Dashboard;
