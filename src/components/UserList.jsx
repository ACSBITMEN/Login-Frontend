// src/components/UserList.jsx

import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthProvider';
import '../styles/components/UserList.css';

const UserList = () => {
  const { getUsers, users, loadingUsers, errorUsers } = useContext(AuthContext);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [filterTerm, setFilterTerm] = useState(''); // Estado para el filtro

  // Al montar el componente, obtenemos los usuarios solo si la lista está vacía
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // Actualizar la lista de usuarios al cambiar la lista en el contexto
  useEffect(() => {
    setSortedUsers(users);
  }, [users]);

  // Función para actualizar la lista manualmente al hacer clic en el botón
  const handleUpdateUsers = () => {
    getUsers(true);
  };

  // Función para ordenar la tabla
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

  // Función para renderizar el ícono de ordenamiento
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

  // Función para filtrar los usuarios
  const filteredUsers = sortedUsers.filter(user => {
    return (
      user.username.toLowerCase().includes(filterTerm.toLowerCase()) ||
      user.first_name.toLowerCase().includes(filterTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(filterTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(filterTerm.toLowerCase()) ||
      user.role_name.toLowerCase().includes(filterTerm.toLowerCase())
    );
  });

  if (loadingUsers) {
    return <div>Cargando usuarios...</div>;
  }

  if (errorUsers) {
    return <div>{errorUsers}</div>;
  }

  return (
    <div>
      <div className='opcListUser'>
        <div className='containerSearch'>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel-fill" viewBox="0 0 16 16">
          <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z"/>
        </svg>
        <input
          type="text"
          placeholder="Filtrar usuarios..."
          value={filterTerm}
          onChange={(e) => setFilterTerm(e.target.value)}
        />
        </div>
        <div className='btnListUser'>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-plus-fill" viewBox="0 0 16 16">
            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
            <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"/>
          </svg>
          Agregar Usuario
          </button>
        <button onClick={handleUpdateUsers}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
          </svg>
          Actualizar
        </button>
        </div>
      </div>
      <div className='containerMain-UserList table-responsive'>
        <table className='table table-striped table-hover'>
          <thead className='table-dark'>
            <tr>
              <th scope="col" onClick={() => sortUsers('id')}>ID {getSortIcon('id')}</th>
              <th scope="col" onClick={() => sortUsers('username')}>Usuario {getSortIcon('username')}</th>
              <th scope="col" onClick={() => sortUsers('first_name')}>Nombre {getSortIcon('first_name')}</th>
              <th scope="col" onClick={() => sortUsers('last_name')}>Apellido {getSortIcon('last_name')}</th>
              <th scope="col" onClick={() => sortUsers('email')}>Email {getSortIcon('email')}</th>
              <th scope="col" onClick={() => sortUsers('role_name')}>Rol {getSortIcon('role_name')}</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td scope="row">{user.id}</td>
                <td>{user.username}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.role_name}</td>
                <td>
                  <div><button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                      <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                    </svg>
                    Editar
                    </button></div>
                  <div><button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                    </svg>
                    Borrar
                    </button></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
