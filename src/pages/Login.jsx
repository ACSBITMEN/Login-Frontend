import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate también
import LoginForm from '../components/LoginForm'; // Importamos el form Login
import useAuth from '../context/useAuth';  // Cambiamos la importación
import '../styles/Login.css';  // Importamos los estilos específicos para Login
import loginImage from '../assets/Login-img.jpg'; // Importamos la imagen
import LogoImage from '../assets/logo.png'; // Importamos la imagen


const Login = () => {

  const [error, setError] = useState(null);
  const { login } = useAuth();  // Usamos el hook de autenticación
  const navigate = useNavigate();

  const handleLogin = (username, password) => {
    const isAuthenticated = login(username, password);
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };


  //Efecto del logo.
  useEffect(() => {
    const logo = document.querySelector('.logo-login');
    const animateLogo = () => {
      logo?.classList.add('fly');  
      setTimeout(() => logo?.classList.remove('fly'), 10000); 
    };
    animateLogo();
    const interval = setInterval(animateLogo, 13000);
    return () => clearInterval(interval);
  }, []);
  


  return (
    <div id="login-page">
      <div className="container-login">
        <div className="container-img">
          <img src={loginImage} alt="Login" />  {/* Utilizamos la imagen importada */}
          <img className='logo-login' src={LogoImage} alt="logo" />  {/* Utilizamos la imagen importada */}
        </div>
        <div className='container-form'>
          <h2>Gestor Técnico Asistencial</h2>
          <LoginForm onSubmit={handleLogin} />
        </div>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
