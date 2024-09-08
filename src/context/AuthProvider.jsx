import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    if (username === 'admin' && password === '1234') {
      const token = 'fake-token';  // Simulamos un token
      setUser({ username, token });  // Guardamos el usuario con el token
      localStorage.setItem('token', token);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Validamos que la prop 'children' esté presente y sea de tipo node
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
