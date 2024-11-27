import './index.css';
import App from './App.jsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Importación de componentes
import DashboardPage from '@routes/dashboard/Page';
import UserFormRegister from '@components/formularioRegistro/formulario-registro';
import { LoginForm } from '@components/Login-Mati/Assets/LoginForm/LoginForm';
import AdminEstado from '@components/cambiarEstado/adminEstado';
import ResetPassword from '@components/restablecerContraseña/contraseña';
import Formulario from '@components/formulario/formulario';
import RequestPasswordReset from '@components/enviarSolicitud/correo';
import RecuperarHoraForm from '@components/formulario/RecuperarHoraForm';



// Definición de las rutas
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Página principal
  },
  {
    path: "/login",
    element: <LoginForm />, // Ruta de login
  },
  {
    path: "/dashboard",
    element: <DashboardPage />, // Ruta del dashboard
  },
  {
    path: "/formulario-registro",
    element: <UserFormRegister />, // Ruta para el formulario de registro
  },
  {
    path: "/estado",
    element: <AdminEstado />, // Ruta para cambiar estado
  },
  {
    path: "/password",
    element: <ResetPassword />, // Ruta para restablecer contraseña
  },
  {
    path: "/form", // Ruta para formulario
    element: <Formulario />,
  },
  {
    path: "/correo",
    element: <RequestPasswordReset />,
  },
  {
    path: "/recuperar-hora",  // Ruta para recuperación de hora médica
    element: <RecuperarHoraForm />,
  },
{
  future: {
    v7_skipActionStatusRevalidation: true,
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
  },
},]);

// Renderizado en el root
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider
      future={{
        v7_startTransition: true,
      }}
      router={router} 
    />
  </StrictMode>,
);
