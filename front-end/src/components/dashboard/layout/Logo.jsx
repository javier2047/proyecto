import "@components/dashboard/layout/logo.css";
import logored from "@images/LogoRed.png";
function Logo() {
  const handleToggleSideBar = () => {
    document.body.classList.toggle("toggle-sidebar");
  };

  return (
    <div className="d-flex flex-md-row justify-content-center align-items-center">
      <div className="p-2">
        <a href="/dashboard" className="logo d-flex align-items-center">
          <img src={logored} alt="Logo Red" />
        </a>
      </div>
      <div className="p-2 align-items-center justify-content-center">
      <span className="d-none d-md-block">Administrador</span>
      </div>
      <div className="p-2">
        <i className="bi bi-list mb-2 ml-4" onClick={handleToggleSideBar}></i>
      </div>
    </div>
  );
}

export default Logo;
