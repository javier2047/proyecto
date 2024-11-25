import {Link} from  'react-router-dom'
export function Navegacion (){
    return (
    <div>
        <Link to='/ListaForms'>
        
        <h1>Home</h1>
        </Link>


        
        <Link to='/forms'>crear formulario</Link>   
        </div>
    )
}