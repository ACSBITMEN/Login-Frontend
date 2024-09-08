import { useState } from 'react';
import PropTypes from 'prop-types';


const LoginForm = ({ onSubmit }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(username, password);  // Enviamos los datos al componente Login
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container-input">
        <label className="label">  
          <input className="input" type="text" name="username" placeholder=" " value={username}
            onChange={(e) => setUsername(e.target.value)} />
            <span className='span'>Ingresa usuario</span>
        </label>
        <label className="label">
          <input className="input" type="password" name="password" placeholder=" " value={password}
            onChange={(e) => setPassword(e.target.value)}/>
          <span className='span'>Ingresa contraseña</span>
        </label>
      </div>
      <button type="submit">Iniciar sesión</button>
    </form>
  );
};

// Definimos las PropTypes para el componente LoginForm
LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired  // Especificamos que onSubmit es una función requerida
};

export default LoginForm;
