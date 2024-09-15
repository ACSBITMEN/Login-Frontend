// src/pages/AdminUser.jsx
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthProvider';
import UserList from '../components/UserList'; // Importamos el componente UserList
import CreateUserModal from '../components/CreateUserModal'; // Importamos el modal
import '../styles/pages/AdminUser.css'; // Importamos los estilos

const AdminUser = () => {
  const { getUsers, users, loadingUsers, errorUsers } = useContext(AuthContext);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [filterTerm, setFilterTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // Estado para el mensaje de éxito

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    setSortedUsers(users);
  }, [users]);

  const handleUpdateUsers = () => {
    getUsers(true);
  };

  const sortUsers = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedData = [...sortedUsers].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setSortedUsers(sortedData);
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        return <span>&#9650;</span>; // Triángulo hacia arriba (orden ascendente)
      } else {
        return <span>&#9660;</span>; // Triángulo hacia abajo (orden descendente)
      }
    }
    return null;
  };

  const filteredUsers = sortedUsers.filter(user => {
    return (
      user.username.toLowerCase().includes(filterTerm.toLowerCase()) ||
      user.first_name.toLowerCase().includes(filterTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(filterTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(filterTerm.toLowerCase()) ||
      user.role_name.toLowerCase().includes(filterTerm.toLowerCase())
    );
  });

  // Función para manejar el éxito de la creación del usuario
  const handleUserCreationSuccess = (message) => {
    setSuccessMessage(message);
  };

  // Función para cerrar el mensaje de éxito manualmente
  const closeSuccessMessage = () => {
    setSuccessMessage('');
  };

  if (loadingUsers) {
    return <div>Cargando usuarios...</div>;
  }

  if (errorUsers) {
    return <div>{errorUsers}</div>;
  }

  return (
    <div id="container-AdminUser">
      {/* Mostrar el mensaje de éxito si existe */}
      {successMessage && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {successMessage}
          <button type="button" className="close" onClick={closeSuccessMessage} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
      
      <h2>Administrador de usuarios</h2>
      <div>
        Esta sección te permite gestionar a los usuarios de la aplicación como administrador de forma eficiente y segura. Aquí podrás realizar operaciones de CRUD (Crear, Leer, Actualizar y Eliminar) para mantener la información de los usuarios siempre.
        <br /><br />
      </div>


      <div className='containerList'>
        <UserList
          users={filteredUsers}
          sortUsers={sortUsers}
          getSortIcon={getSortIcon}
          filterTerm={filterTerm}
          setFilterTerm={setFilterTerm}
          handleUpdateUsers={handleUpdateUsers}
          setShowModal={setShowModal}
        />
      </div>
      
      {/* Modal para agregar usuario */}
      <CreateUserModal 
        show={showModal} 
        onClose={() => setShowModal(false)} 
        onSuccess={handleUserCreationSuccess} // Pasar la función de éxito al modal
      />
    </div>
  );
};

export default AdminUser;
