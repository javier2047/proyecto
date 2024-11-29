import { useState } from 'react';
import './LoginForm.css';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const LoginForm = () => {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Hacer login y obtener el token
      const loginResponse = await fetch('http://127.0.0.1:8000/api/v1/auth/jwt/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rut, password }),
      });

      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        const token = loginData.access; // Obtén el token de acceso

        // Almacenar el token en localStorage
        localStorage.setItem('token', token);

        // Obtener información del usuario
        const userResponse = await fetch('http://127.0.0.1:8000/api/v1/auth/users/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Usar el token dinámico
          },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          const currentUser = userData.find((user) => user.rut === rut);
          const userType = currentUser?.tipousuario; // Acceder al tipo de usuario

          // Redirigir según el tipo de usuario
          if (userType === 'supervisor') {
            toast.success('Inicio de sesión exitoso. Redirigiendo al panel de Supervisor...', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            setTimeout(() => {
              window.location.href = '/dashboard';
            }, 3000);
          } else if (userType === 'medico') {
            toast.success('Inicio de sesión exitoso. Redirigiendo al formulario médico...', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            setTimeout(() => {
              window.location.href = '/form';
            }, 3000);
          } else if (userType === 'administrativo') {
            toast.success('Inicio de sesión exitoso. Redirigiendo al formulario administrativo...', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            setTimeout(() => {
              window.location.href = '/formulario-registro';
            }, 3000);
          } else {
            toast.error('Tipo de usuario no reconocido.', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
        } else {
          toast.error('Error al obtener la información del usuario.', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } else {
        toast.error('Usuario o contraseña incorrectos.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (e) {
      toast.error('Error al conectar con el servidor.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <>
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
            <a href="/correo">Olvidé mi contraseña</a>
          </div>

          {error && <p className="error-message">{error}</p>}
          
          <button type="submit">Ingresar</button>
        </form>
      </div>

      {/* Contenedor de notificaciones */}
      <ToastContainer />
    </>
  );
};

export default LoginForm;