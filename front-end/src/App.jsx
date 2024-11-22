import './App.css';


// import icons
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'remixicon/fonts/remixicon.css';

// import Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import Header from "@components/dashboard/layout/Header"

import Formulario from '@components/formulario/formulario';
function App() {
  return <Formulario/>
}


// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LoginPage from '@components/login/navegacionlogin';
// import Formulario from '@components/formulario/formulario';
// import UserForm from '@components/formularioRegistro/formularioRegistro';
// import DashboardPage from '@routes/dashboard/Page';

// function App() {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<LoginPage />} />
//                 <Route path="/medico" element={<Formulario />} />
//                 <Route path="/administrador" element={<UserForm />} />
//                 <Route path="/supervisor" element={<DashboardPage />} />
//             </Routes>
//         </Router>
//     );
// };

export default App;



