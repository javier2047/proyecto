import React, { useState } from 'react';
import './LoginForm.css';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

export const LoginForm = () => {
  const [rut, setrut] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/auth/jwt/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rut, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        alert('Inicio de sesión exitoso');
        window.location.href = '/dashboard';
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
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
            placeholder='Usuariosss'
            required
            value={rut}
            onChange={(e) => setrut(e.target.value)} 
          />
          <FaUser className='icon' />
        </div>
        <div className='input-box'>
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
          <a href="#">Olvidé mi contraseña</a>
        </div>

        {error && <p className="error-message">{error}</p>}
        
        <button type="submit">Ingresar</button>

        <div className='register-link'>
          <p>¿No tienes una cuenta? <a href="#">Registrarse</a></p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
