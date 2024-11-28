
function NavNotice() {
  return (
    <li className='nav-item dropdown'>
        <a className='nav-link nav-icon' data-bs-toggle='dropdown' href="#">
            <i className='bi bi-bell'/>
            <span className='badge bg-primary badge-number'>4</span>
        </a>

        <ul className='dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications'>
            <li className='dropdown-header'>
                Tienes 4 nuevas notificaciones
                <a href="/estado">
                    <span className='badge rounded-pill bg-primary p-2 ms-2'>
                        Ver todos
                    </span>
                </a>
            </li>
            <li>
                <hr className='dropdown-divider'/>
            </li>

            <li className='notification-item'>
                <i className='bi bi-exclamation-circle text-warning'></i>
                <div>
                    <h4>Tienes una pendiente una aprobacion</h4>
                    <p>Se te ha enviado una solicitud para anular la hora de Guillermo Lafourcade a las 13:25 del 12/12/2024</p>
                    <p>Hace 30 minutos</p>
                </div>
            </li>
            <li>
                <hr className='dropdown-divider'/>
            </li>

            <li className='notification-item'>
                <i className='bi bi-exclamation-circle text-danger'></i>
                <div>
                    <h4>Haz cancelado una hora medica</h4>
                    <p>Haz cancelado la solicitud de Francisca Figueroa para las 13:30 de 01/12/2024</p>
                    <p>Hace 2 horas y 08 minutos</p>
                </div>
            </li>

            <li>
                <hr className='dropdown-divider'/>
            </li>

            <li className='notification-item'>
                <i className='bi bi-exclamation-circle text-success'></i>
                <div>
                    <h4>Haz Aprobado la cancelacion de:</h4>
                    <p>Haz aprobado la cancelacion de Rodrigo Prado para las 16:00 29/11/2024</p>
                    <p>Hace 2 horas</p>
                </div>
            </li>
            <li>
                <hr className='dropdown-divider'/>
            </li>
            <li className='dropdown-footer'>
                <a href="#">Ver mas notificaciones</a>
            </li>
        </ul>
    </li>
  )
}

export default NavNotice