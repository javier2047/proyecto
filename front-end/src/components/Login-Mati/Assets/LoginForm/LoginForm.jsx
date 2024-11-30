import { useState } from 'react';
import './LoginForm.css';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { fetchUserInfo } from '@services/getUserInfo';

export const LoginForm = () => {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const loginResponse = await fetch('http://127.0.0.1:8000/api/v1/auth/jwt/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rut, password }),
      });

      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        const token = loginData.access;

        // Almacenar el token en localStorage
        localStorage.setItem('token', token);

        // Obtener información del usuario
        try {
          const userInfo = await fetchUserInfo();
          const currentUser = userInfo.find((user) => user.rut === rut);
          const userType = currentUser?.tipousuario;

          // Guardar la información del usuario en el contexto

          // Redirigir según el tipo de usuario
          if (userType === 'supervisor') {
            window.location.href = '/dashboard';
          } else if (userType === 'medico') {
            window.location.href = '/form';
          } else if (userType === 'administrativo') {
            window.location.href = '/formulario-registro';
          } else {
            setError('Tipo de usuario no reconocido.');
          }
        }catch(userInfoError) {
          setError('Error al obtener la información del usuario.');
          console.error('Error en fetchUserInfo', userInfoError)
        }
      } else {
        setError('Usuario o contraseña incorrectos.');
      }
    } catch (e) {
      setError('Error al conectar con el servidor.', e);
    }
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <img
          src="https://b2597467.smushcdn.com/2597467/wp-content/uploads/logo-redsalud-dental-blanco.png?lossy=1&strip=1&webp=1"
          alt="LogoLogin"
          className="LogoLogin"
        />
        <div className='input-box'>
          <input
            type="text"
            placeholder='Usuario'
            required
            value={rut}
            onChange={(e) => setRut(e.target.value)} 
          />
          <FaUser className='icon' />
        </div>
        <div className='input-box mt-2'>
          <input
            type="password"
            placeholder='Contraseña'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <RiLockPasswordFill className='icon' />
        </div>

        <div className='remember-forgot'>
          <label><input type="checkbox" /> Recordarme</label>
          <a href="/reset-password">Olvidé mi contraseña</a>
        </div>

        {error && <p className="error-message">{error}</p>}
        
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default LoginForm;
