import './App.css';


// import icons
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'remixicon/fonts/remixicon.css';

// import Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Header from "@components/dashboard/layout/Header"

/*
function App() {
  return <Header/>
}
*/

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

export default App;



