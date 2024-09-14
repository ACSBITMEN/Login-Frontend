// src/components/UserList.jsx

import { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthProvider';  // Usamos el contexto de autenticación
import '../styles/components/UserList.css';

const UserList = () => {
  const { getUsers, users, loadingUsers, errorUsers } = useContext(AuthContext);  // Consumimos el contexto

  // Al montar el componente, obtenemos los usuarios solo si la lista está vacía
  useEffect(() => {
    getUsers();  // Llama a la función sin `forceUpdate` para que solo haga la solicitud si la lista está vacía
  }, [getUsers]);

  // Función para actualizar la lista manualmente al hacer clic en el botón
  const handleUpdateUsers = () => {
    getUsers(true);  // Llama a la función con `forceUpdate = true` para forzar una nueva solicitud
  };

  if (loadingUsers) {
    return <div>Cargando usuarios...</div>;
  }

  if (errorUsers) {
    return <div>{errorUsers}</div>;
  }

  return (
    <div className='containerMain-UserList'>
      <button onClick={handleUpdateUsers}>Actualizar lista</button> {/* Botón para actualizar usuarios */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>usuario</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.role_name}</td>
              <td>
                <div><button>Edit</button></div>
                <div><button>Delete</button></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
