import '@components/dashboard/layout/logo.css';
import logored from '@images/LogoRed.png';
function Logo() {
  const handleToggleSideBar = () => {
    document.body.classList.toggle('toggle-sidebar');
  }

  return (
    <div className='d-flex align-items-center justify-content-between mt-3'>
        <a href="/dashboard" className='logo d-flex align-items-center'>
            <img src={logored} alt="Logo Red"/>
            <span className='d-none d-lg-block'>Administrador</span>
        </a>
        <i className="bi bi-list mb-2 ml-4" onClick={handleToggleSideBar}></i> 
    </div>
  )
}

export default Logo