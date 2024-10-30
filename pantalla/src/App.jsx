import {BrowserRouter,  Routes, Route,Navigate} from 'react-router-dom'

import {Paginalistas} from './pages/ListaForms'
import {Formulario} from './pages/formularios'

import { Navegacion } from './components/navegacion'

function App() {
  return (
    <BrowserRouter>
    
    <Navegacion/>
    
    <Routes>
    <Route path="/" element={<Navigate to={"/ListaForms"} />} />
    <Route path="/listaforms" element={<Paginalistas/>} > 
    </Route>
    <Route path="/forms" element={<Formulario/>} > 
    </Route>


    </Routes>
    
    
    </BrowserRouter>
  )
  
}
export default App;