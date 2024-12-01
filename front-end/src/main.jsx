import './index.css';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App.jsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

// Importación de componentes
import DashboardPage from '@routes/dashboard/Page';
import UserFormRegister from '@components/formularioRegistro/formulario-registro';
import { LoginForm } from '@components/Login-Mati/Assets/LoginForm/LoginForm';
import AdminEstado from '@components/cambiarEstado/adminEstado';
import Formulario from '@components/formulario/formulario';
import RequestPasswordReset from '@components/enviarSolicitud/correo';
import RecuperarHoraForm from '@components/formulario/RecuperarHoraForm';
import ActivatePage from '@routes/ActivatePage';
import AdminOpciones from '@components/Re-agenda/AdminOpciones';
import ResetPasswordPageConfirm from '@components/restablecerContraseña/confirmarContrasena';
// Definición de las rutas
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Página principal
  },
  {
    path: '/login',
    element: <LoginForm />, // Ruta de login
  },
  {
    path: '/dashboard',
    element: <DashboardPage />, // Ruta del dashboard
  },
  {
    path: '/formulario-registro',
    element: <UserFormRegister />, // Ruta para el formulario de registro
  },
  {
    path: '/estado',
    element: <AdminEstado />, // Ruta para cambiar estado
  },
  {
    path: '/password/reset/confirm/:uid/:token',
    element: <ResetPasswordPageConfirm />, // Ruta para restablecer contraseña
  },
  {
    path: '/form',
    element: <Formulario />, // Ruta para formulario
  },
  {
    path: '/reset-password',
    element: <RequestPasswordReset />,
  },
  {
    path: '/recuperar-hora', // Ruta para recuperación de hora médica
    element: <RecuperarHoraForm />,
  },
  {
    path: '/activate/:uid/:token',
    element: <ActivatePage />, // Ruta para activar la cuenta
  },
  {
    path: '/adminOpciones',
    element: <AdminOpciones/>, // Ruta para activar la cuenta
  },
]);


// Renderizado en el root
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider
        router={router}
        future={{
          v7_skipActionStatusRevalidation: true,
          v7_relativeSplatPath: true,
          v7_fetcherPersist: true,
          v7_normalizeFormMethod: true,
          v7_partialHydration: true,
          v7_startTransition: true,
        }}
      />
    </Provider>
  </StrictMode>
);
