import './App.css';


// import icons
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'remixicon/fonts/remixicon.css';

// import Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

<<<<<<< HEAD
import React from "react";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
=======
>>>>>>> 31123c6862c781f8326a0e571a5def5c167f4efa
import Header from "@components/dashboard/layout/Header"
import UserForm from "../src/components/formularioRegistro/formularioRegistro"
import Login from '../src/components/login/login'
import Formulario from '../src/components/formulario/formulario';




<<<<<<< HEAD
/*
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '@components/login/navegacionlogin';
import Medico from '@components/formulario/formulario';
//import Administrador from './components/';
import Supervisor from '@components/dashboard/layout/Header';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/medico" element={<Medico />} />
                <Route path="/administrador" element={<Administrador />} />
                <Route path="/supervisor" element={<Supervisor />} />
            </Routes>
        </Router>
    );
};
*/
=======
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

>>>>>>> 31123c6862c781f8326a0e571a5def5c167f4efa
export default App;



