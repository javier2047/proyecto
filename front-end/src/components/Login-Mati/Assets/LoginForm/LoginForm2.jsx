import React, { useState } from 'react';
import './LoginForm.css';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

        // Mostrar notificación de éxito
        toast.success('Inicio de sesión exitoso', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Redirigir después de 3 segundos
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 3000);
      } else {
        // Mostrar notificación de error
        toast.error('Usuario o contraseña incorrectos', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      // Mostrar notificación de error de conexión
      toast.error('Error al conectar con el servidor', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
      
      {/* Contenedor de notificaciones */}
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
