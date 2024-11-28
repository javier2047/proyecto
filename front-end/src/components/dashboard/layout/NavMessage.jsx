function NavMessage() {
  return (
    <li className='nav-item dropdown'>
        <a className='nav-link nav-icon' href="#" data-bs-toggle='dropdown'>
            <i className='bi bi-chat-left-text'></i>
            <span className='badge bg-success badge-number'>3</span>
        </a>
        <ul className='dropdown-menu dropdown-menu-end dropdown-menu-arrow messages'>
            <li className='dropdown-header'>
                Tienes 3 mensajes!
                <a href="#">
                    <span className='badge rounded-pill bg-primary p-2 ms-2'>
                        Ver todos
                    </span>
                </a>
            </li>
            <li>
                <hr className='dropdown-divider'/>
            </li>
            <li className='messages-item'>
                <a href="#">
                    <img src="" alt="" className='rounded-circle'/>
                    <div>
                        <h5>Traumatologia</h5>
                        <h4>Maria Escudero</h4>
                        <p>Hola!, queria ver la posibilidad de modificar mi hora con el paciente de mañana a las 14:00 para el dia jueves a la misma hora, ya que tengo un congreso...</p>
                        <p>Hace 3 horas y 20 minutos</p>
                    </div>
                </a>
            </li>
            <li>
                <hr className='dropdown-divider'/>
            </li>
            <li className='messages-item'>
                <a href="#">
                    <img src="" alt="" className='rounded-circle'/>
                    <div>
                        <h5>Obstetricia</h5>
                        <h4>Rodrigo Prado</h4>
                        <p>Hola David, necesito cancelar todas las horas de la primera semana de enero, ya que me voy de vacaciones...</p>
                        <p>Hace 35 minutos</p>
                    </div>
                </a>
            </li>
            <li>
                <hr className='dropdown-divider'/>
            </li>
            <li className='dropdown-footer'>Ver Mensajes</li>
        </ul>
    </li>
  )
}

export default NavMessage