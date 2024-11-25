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
