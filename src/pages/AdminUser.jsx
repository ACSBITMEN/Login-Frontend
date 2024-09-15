// src/pages/AdminUser.jsx
import UserList from '../components/UserList';  // Importamos el componente UserList
import '../styles/pages/AdminUser.css';  // Importamos los estilos

const AdminUser = () => {
  return (
    <div id="container-AdminUser">
      <h2>Administrador de usuarios</h2>
      <div>Esta sección te permite gestionar a los usuarios de la aplicación como administrador de forma eficiente y segura. Aquí podrás realizar operaciones de CRUD (Crear, Leer, Actualizar y Eliminar) para mantener la información de los usuarios siempre. <br /><br /> </div>
      <div className='containerList'>
        <UserList />  {/* Aquí consumimos el componente UserList */}
      </div>
    </div>
  );
};

export default AdminUser;