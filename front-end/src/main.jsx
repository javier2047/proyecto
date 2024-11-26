import './index.css'
import App from './App.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DashboardPage from '@routes/dashboard/Page';
import UserFormRegister from '@components/formularioRegistro/formulario-registro';
import { LoginForm } from '@components/Login-Mati/Assets/LoginForm/LoginForm';
import AdminEstado from '@components/cambiarEstado/adminEstado';
import ResetPassword from '@components/restablecerContraseña/contraseña';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/login",
    element: <LoginForm />
  },

  {
    path: "/dashboard",
    element: <DashboardPage />
  },
  {
    path: "/formulario-registro",
    element: <UserFormRegister/>
  },
  {
    path: "/estado",
    element: <AdminEstado/>
  },
  {
    path: "/password",
    element: <ResetPassword />
  },

],
  {
    future: {
      v7_skipActionStatusRevalidation: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,

    },
  });


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider
      future={{
        v7_startTransition: true,
      }}
      router={router} />
  </StrictMode>,
)
