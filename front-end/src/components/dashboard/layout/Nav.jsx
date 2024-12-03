import "@components/dashboard/layout/nav.css";
import NavNotice from "@components/dashboard/layout/NavNotice";

import NavAvatar from "@components/dashboard/layout/NavAvatar";
function Nav() {
  return (
    <nav className="header-nav">
      <ul className="d-flex flex-row align-items-center">
        {/* Notificaciones */}
        <li className="nav-item">
          <NavNotice />
        </li>
        {/* Avatar */}
        <li className="nav-item">
          <NavAvatar />
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
