<<<<<<< HEAD
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const login = async (credentials) => {
    try {
        const response = await axios.post('http://localhost:8000/api/login/', credentials);
        const { token, TIPO_USUARIO_CHOICES } = response.data;
        localStorage.setItem('token', token); // Guarda el token en localStorage
        return TIPO_USUARIO_CHOICES; // Retorna el rol del usuario
    } catch (error) {
        console.error('Error en el login:', error);
        return null;
    }
};

const LoginPage = () => {
    const [rut, setrut] = useState('');
    const [contraseña, setcontraseña] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const TIPO_USUARIO_CHOICES = await login({ rut: rut, contraseña: contraseña }); // Ajusta los datos enviados al backend

        if (TIPO_USUARIO_CHOICES) {
            switch (TIPO_USUARIO_CHOICES) {
                case 'medico':
                    navigate('/formulario'); // Ruta lógica para el médico
                    break;
                case 'administrador':
                    navigate('/registro'); // Ruta lógica para el administrador
                    break;
                case 'supervisor':
                    navigate('/dashboard'); // Ruta lógica para el supervisor
                    break;
                default:
                    console.error('Rol no reconocido');
            }
        } else {
            alert('Credenciales inválidas');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type="text"
                placeholder="RUT"
                value={rut}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={contraseña}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Iniciar sesión</button>
        </form>
    );
};

export default LoginPage; // Exporta el componente correctamente
=======
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import login from './login'; // Importa la función de login

// const LoginPage = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         const role = await login({ rut, contraseña });

//         if (role) {
//             switch (role) {
//                 case 'medico':
//                     navigate('/front-end/src/components/formulario/formulario.jsx');
//                     break;
//                 case 'administrador':
//                     navigate('/front-end/src/components/formularioRegistro/formularioRegistro.jsx');
//                     break;
//                 case 'supervisor':
//                     navigate('/front-end/src/components/dashboard/layout');
//                     break;
//                 default:
//                     console.error('Rol no reconocido');
//             }
//         } else {
//             alert('Credenciales inválidas');
//         }
//     };

//     return (
//         <form onSubmit={handleLogin}>
//             <input
//                 type="text"
//                 placeholder="rut"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//             />
//             <input
//                 type="password"
//                 placeholder="Contraseña"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//             />
//             <button type="submit">Iniciar sesión</button>
//         </form>
//     );
// };

// export default LoginPage;
>>>>>>> 31123c6862c781f8326a0e571a5def5c167f4efa
