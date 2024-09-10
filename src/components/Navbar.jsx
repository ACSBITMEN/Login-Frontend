import { Link, useLocation } from 'react-router-dom';
import useAuth from '../context/useAuth'; // Para manejar la autenticación y roles
import '../styles/components/Navbar.css';  // Importamos los estilos específicos para Navbar
import NavBarLogo from '../assets/logo.png';

const Navbar = () => {
  const location = useLocation(); // Obtenemos la ubicación actual
  const { user, logout } = useAuth(); // Acceder al usuario autenticado y al logout

  return (
    <nav id='navBar'>
      {/* Logo */}
      <ul className="Logo">
        <li className='d-flex'>
          <img className='rotate-center' src={NavBarLogo} alt="Logo" />
          <span className="nav-text-logo">GTA</span>
        </li>
      </ul>

      {/* Links de navegación */}
      <ul className='menu-nav'>
        <li className={location.pathname === '/dashboard/inicio' ? 'active' : ''}>
          <Link to="/dashboard/inicio">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-grid-fill" viewBox="0 0 16 16">
              <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5z"/>
            </svg>
            <span className="nav-text">Inicio</span>
          </Link>
        </li>

        {user?.role === 'admin' && (
          <li className={location.pathname === '/dashboard/adminUser' ? 'active' : ''}>
            <Link to="/dashboard/adminUser">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
              </svg>
              <span className="nav-text">Admin Users</span>
            </Link>
          </li>
        )}

        <li className={location.pathname === '/dashboard/plantillas' ? 'active' : ''}>
        <Link to="/dashboard/plantillas">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-font-fill" viewBox="0 0 16 16">
              <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M5.057 4h5.886L11 6h-.5c-.18-1.096-.356-1.192-1.694-1.235l-.298-.01v6.09c0 .47.1.582.903.655v.5H6.59v-.5c.799-.073.898-.184.898-.654V4.755l-.293.01C5.856 4.808 5.68 4.905 5.5 6H5z"/>
            </svg>
            <span className="nav-text">Plantillas</span>
          </Link>
        </li>


      </ul>

      {/* Configuración */}
      <ul className="config">
        <li>
          <button onClick={logout} className={location.pathname === '/login' ? 'active' : ''}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
              <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
            </svg>
            <span className="nav-text">Salir</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
