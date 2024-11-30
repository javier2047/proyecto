import profileImg from '@images/user.jpg';
import { fetchUserInfo } from '@services/getUserInfo';
import { logout } from '@auth/authService';
import { useEffect, useState } from 'react';
function NavAvatar() {
  const [userName, setUserName] = useState('')
  const [userRole, setUserRole] = useState('')

  useEffect(() => {
    const loadUserInfo = async () => {
      try{
        const userInfoArray = await fetchUserInfo();
        const userInfo = userInfoArray[0];
        setUserName(`${userInfo.nombre} ${userInfo.apellido}`);
        setUserRole(userInfo.tipousuario || 'Supervisor');
      } catch(e){
        console.error('Error al cargar información de usuario:', e);
      }
    };

    loadUserInfo();
  },[])

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  }
  return (
    <li className='nav-item dropdown pe-3'>
      <a
        className='nav-link nav-profile d-flex align-items-center pe-0'
        href='#'
        data-bs-toggle='dropdown'
      >
        <img src={profileImg} alt='Profile' className='rounded-circle' />
        <span className='d-none d-md-block dropdown-toggle ps-2'>{userName || 'Cargando...'}</span>
      </a>
      <ul className='dropdown-menu dropdown-menu-end dropdown-menu-arrow profile'>
        <li className='dropdown-header'>
          <h6>{userName || 'Cargando...'}</h6>
          <span>{userRole}</span>
        </li>
        <li>
          <hr className='dropdown-divider' />
        </li>
        <li>
          <a
            className='dropdown-item d-flex align-items-center'
            onClick={handleLogout}
            href='/login'
          >
            <i className='bi bi-box-arrow-right'></i>
            <span>Salir</span>
          </a>
        </li>
      </ul>
    </li>
  );
}

export default NavAvatar;
