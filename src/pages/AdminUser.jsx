// src/pages/AdminUser.jsx
import UserList from '../components/UserList';  // Importamos el componente UserList
import '../styles/pages/AdminUser.css';  // Importamos los estilos

const AdminUser = () => {
  return (
    <div id="container-AdminUser">
      <h2>Administrador de usuarios</h2>
      <div></div>
      <div className='containerList'>
        <UserList />  {/* Aquí consumimos el componente UserList */}
      </div>
    </div>
  );
};

export default AdminUser;