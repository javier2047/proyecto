import './index.css'
import App from './App.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DashboardPage from '@routes/dashboard/Page';
import UserFormR from '@components/formularioRegistro/formularioRegistro';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />
  },
  {
    path: "/form",
    element: <UserFormR />
  }

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
